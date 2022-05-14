package com.tonhub.wallet.modules.store;

import android.app.ActivityManager;
import android.content.Context;

import androidx.biometric.BiometricManager;
import androidx.biometric.BiometricPrompt;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.FragmentActivity;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContext;

import org.json.JSONException;

import java.security.GeneralSecurityException;

import javax.crypto.Cipher;
import javax.crypto.spec.GCMParameterSpec;

public class AuthenticationHelper {
    private final ReactContext mContext;
    private Boolean isAuthenticating = false;
    AuthenticationHelper(Context context) {
        this.mContext = (ReactContext) context;
    }

    private void openAuthenticationPrompt(Promise promise,
                                          EncryptionCallback encryptionCallback,
                                          Cipher cipher,
                                          GCMParameterSpec gcmParameterSpec,
                                          PostEncryptionCallback postEncryptionCallback) {
        if (isAuthenticating) {
            promise.reject(
                    "AUTH_IN_PROGRESS",
                    "Authentication is already in progress"
            );
            return;
        }

        BiometricManager biometricManager = BiometricManager.from(mContext);
        int checkRes = biometricManager.canAuthenticate(
                BiometricManager.Authenticators.DEVICE_CREDENTIAL
                        | BiometricManager.Authenticators.BIOMETRIC_STRONG
        );
        switch (checkRes) {
            case BiometricManager.BIOMETRIC_ERROR_HW_UNAVAILABLE:
            case BiometricManager.BIOMETRIC_ERROR_NO_HARDWARE:
                promise.reject(
                        "AUTH_NOT_AVAILABLE",
                        "No hardware available for passcode authentication."
                );
                return;
            case BiometricManager.BIOMETRIC_ERROR_NONE_ENROLLED:
                promise.reject(
                        "AUTH_NOT_CONFIGURED",
                        "No passcode enrolled"
                );
                return;
            case BiometricManager.BIOMETRIC_ERROR_SECURITY_UPDATE_REQUIRED:
            case BiometricManager.BIOMETRIC_ERROR_UNSUPPORTED:
            case BiometricManager.BIOMETRIC_STATUS_UNKNOWN:
                promise.reject(
                        "AUTH_NOT_UNKNOWN_ERR",
                        "STATUS_UNKNOWN"
                );
            case BiometricManager.BIOMETRIC_SUCCESS:
                break;
        }

        BiometricPrompt.PromptInfo promptInfo = new BiometricPrompt
                .PromptInfo.Builder()
                .setTitle("Authenticate")
                .setAllowedAuthenticators(BiometricManager.Authenticators.DEVICE_CREDENTIAL | BiometricManager.Authenticators.BIOMETRIC_STRONG)
                .build();

        if (!isAppInforegrounded()) {
            promise.reject(
                    "APP_BACKGROUNDED",
                    "Cannot display biometric prompt when the app is not in the foreground"
            );
            return;
        }

        FragmentActivity fragmentActivity = getCurrentActivity();

        fragmentActivity.runOnUiThread(() -> {
        isAuthenticating = true;
            new BiometricPrompt(
                    fragmentActivity,
                    ContextCompat.getMainExecutor(mContext),
                    new BiometricPrompt.AuthenticationCallback() {
                        @Override
                        public void onAuthenticationSucceeded(BiometricPrompt.AuthenticationResult result) {
                            super.onAuthenticationSucceeded(result);
                            isAuthenticating = false;

                            Cipher cipher = result.getCryptoObject().getCipher();
                            handleEncryptionCallback(
                                    promise,
                                    encryptionCallback,
                                    cipher,
                                    gcmParameterSpec,
                                    postEncryptionCallback
                            );
                        }

                        @Override
                        public void onAuthenticationError(int errorCode, CharSequence errString) {
                            super.onAuthenticationError(errorCode, errString);
                            isAuthenticating = false;

                            if (
                                    errorCode == BiometricPrompt.ERROR_USER_CANCELED
                                    || errorCode == BiometricPrompt.ERROR_NEGATIVE_BUTTON
                            ) {
                                promise.reject(
                                        "CANCELLED",
                                        "User canceled the authentication"
                                );
                            } else {
                                promise.reject(
                                        "AUTH_FAILURE",
                                        "Could not authenticate the user"
                                );
                            }
                        }
                    }
            ).authenticate(promptInfo, new BiometricPrompt.CryptoObject(cipher));
        });
    }

    private void handleEncryptionCallback(
            Promise promise,
            EncryptionCallback encryptionCallback,
            Cipher cipher,
            GCMParameterSpec gcmParameterSpec,
            PostEncryptionCallback postEncryptionCallback
    ) {
        try {
            encryptionCallback.run(promise, cipher, gcmParameterSpec, postEncryptionCallback);
        } catch (GeneralSecurityException exception) {
            promise.reject(
                    "FAILURE",
                    "Could not encrypt/decrypt the value for KeychainStoreModule",
                    exception
            );
        } catch (JSONException exception) {
            promise.reject(
                    "ENCODE_FAILURE",
                    "Could not create an encrypted JSON item for KeychainStoreModule",
                    exception
            );
        }
    }

    protected FragmentActivity getCurrentActivity() {
        final FragmentActivity activity = (FragmentActivity) mContext.getCurrentActivity();
        if (null == activity) throw new NullPointerException("Not assigned current activity");

        return activity;
    }

    public Boolean isAppInforegrounded() {
        ActivityManager.RunningAppProcessInfo appProcessInfo = new ActivityManager.RunningAppProcessInfo();
        ActivityManager.getMyMemoryState(appProcessInfo);
        return (appProcessInfo.importance == ActivityManager.RunningAppProcessInfo.IMPORTANCE_FOREGROUND ||
                appProcessInfo.importance == ActivityManager.RunningAppProcessInfo.IMPORTANCE_VISIBLE);
    }

    private class DefaultCallBack implements AuthenticationCallback {
        public void checkAuthentication(
                Promise promise,
                Cipher cipher,
                GCMParameterSpec gcmParameterSpec,
                EncryptionCallback encryptionCallback,
                PostEncryptionCallback postEncryptionCallback
        ) {
            openAuthenticationPrompt(promise, encryptionCallback, cipher, gcmParameterSpec, postEncryptionCallback);
        }
    }

    public AuthenticationCallback getDefaultCallback() {
        return new DefaultCallBack();
    }
}
