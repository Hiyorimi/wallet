import BN from "bn.js";
import React from "react"
import { View, Text } from "react-native";
import { fromNano } from "ton";
import { t } from "../../i18n/t";
import { Theme } from "../../Theme";
import { bnIsLess } from "../../utils/bnComparison";
import { parseAmountToNumber, toFixedBN } from "../../utils/parseAmount";
import { PriceComponent } from "../PriceComponent";
import { ValueComponent } from "../ValueComponent";

export const StakingCalcComponent = React.memo((
    {
        amount,
        topUp,
        member
    }: {
        amount: string,
        topUp?: boolean,
        member?: {
            balance: BN,
            pendingDeposit: BN,
            pendingWithdraw: BN,
            withdraw: BN
        } | null
    }) => {
    if (topUp && member) {
        const yearly = toFixedBN(parseAmountToNumber(fromNano(member.balance)) * 0.1);
        const yearlyPlus = yearly.add(toFixedBN(parseAmountToNumber(amount) * 0.1));
        return (
            <>
                <Text style={{
                    fontSize: 16,
                    color: Theme.textColor,
                    fontWeight: '600',
                    marginTop: 20
                }}>
                    {t('products.staking.calc.topUpTitle')}
                </Text>
                <View style={{
                    backgroundColor: 'white',
                    borderRadius: 14,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingLeft: 16,
                    marginVertical: 10
                }}>
                    <View style={{
                        flexDirection: 'row', width: '100%',
                        justifyContent: 'space-between', alignItems: 'center',
                        paddingRight: 16,
                        height: 56
                    }}>
                        <Text style={{
                            fontSize: 16,
                            color: '#7D858A',
                        }}>
                            {t('products.staking.calc.yearlyCurrent')}
                        </Text>
                        <View>
                            <Text style={{
                                fontWeight: '400',
                                fontSize: 16,
                                color: Theme.textColor
                            }}>
                                <ValueComponent precision={2} value={yearly} />
                                {' TON'}
                            </Text>
                            <PriceComponent
                                amount={yearly}
                                style={{
                                    backgroundColor: 'transparent',
                                    paddingHorizontal: 0, paddingVertical: 2,
                                    alignSelf: 'flex-end'
                                }}
                                textStyle={{ color: '#6D6D71', fontWeight: '400' }}
                            />
                        </View>
                    </View>
                    <View style={{
                        height: 1, width: '100%',
                        backgroundColor: Theme.divider,
                    }} />
                    <View style={{
                        flexDirection: 'row', width: '100%',
                        justifyContent: 'space-between', alignItems: 'center',
                        paddingRight: 16,
                        height: 56
                    }}>
                        <Text style={{
                            fontSize: 16,
                            color: '#7D858A'
                        }}>
                            {t('products.staking.calc.yearlyTopUp')}
                        </Text>
                        <View>
                            <Text style={{
                                fontWeight: '600',
                                fontSize: 16,
                                color: '#4FAE42'
                            }}>
                                <ValueComponent precision={2} value={yearlyPlus} />
                                {' TON'}
                            </Text>
                            <PriceComponent
                                amount={yearlyPlus}
                                style={{
                                    backgroundColor: 'transparent',
                                    paddingHorizontal: 0, paddingVertical: 2,
                                    alignSelf: 'flex-end'
                                }}
                                textStyle={{ color: '#6D6D71', fontWeight: '400' }}
                            />
                        </View>
                    </View>
                </View>
                <Text style={{
                    color: '#8E979D',
                    marginTop: -4,
                    fontSize: 13,
                    fontWeight: '400'
                }}>
                    {t('products.staking.calc.note')}
                </Text>
            </>
        )
    }

    const parsed = parseAmountToNumber(amount);
    const yearly = toFixedBN(parsed * 0.1);
    const monthly = toFixedBN(parsed * (Math.pow((1 + 0.1 / 366), 30)) - parsed);
    const daily = toFixedBN(parsed * (1 + 0.1 / 366) - parsed)

    return (
        <>
            <View style={{
                backgroundColor: 'white',
                borderRadius: 14,
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: 16,
                marginVertical: 14
            }}>
                <View style={{
                    flexDirection: 'row', width: '100%',
                    justifyContent: 'space-between', alignItems: 'center',
                    paddingRight: 16,
                    height: 56
                }}>
                    <Text style={{
                        fontSize: 16,
                        color: '#7D858A'
                    }}>
                        {t('products.staking.calc.yearly')}
                    </Text>
                    <View>
                        <Text style={{
                            fontWeight: '600',
                            fontSize: 16,
                            color: '#4FAE42'
                        }}>
                            {'~'}
                            <ValueComponent precision={2} value={yearly} />
                            {' TON'}
                        </Text>
                        <PriceComponent
                            amount={yearly}
                            style={{
                                backgroundColor: 'transparent',
                                paddingHorizontal: 0, paddingVertical: 2,
                                alignSelf: 'flex-end'
                            }}
                            textStyle={{ color: '#6D6D71', fontWeight: '400' }}
                        />
                    </View>
                </View>
                <View style={{
                    height: 1, width: '100%',
                    backgroundColor: Theme.divider,
                }} />
                <View style={{
                    flexDirection: 'row', width: '100%',
                    justifyContent: 'space-between', alignItems: 'center',
                    paddingRight: 16,
                    height: 56
                }}>
                    <Text style={{
                        fontSize: 16,
                        color: '#7D858A'
                    }}>
                        {t('products.staking.calc.monthly')}
                    </Text>
                    <View>
                        <Text style={{
                            fontWeight: '600',
                            fontSize: 16,
                            color: '#4FAE42'
                        }}>
                            {'~'}
                            <ValueComponent precision={bnIsLess(monthly, 0.01) ? 6 : 2} value={monthly} />
                            {' TON'}
                        </Text>
                        <PriceComponent
                            amount={monthly}
                            style={{
                                backgroundColor: 'transparent',
                                paddingHorizontal: 0, paddingVertical: 2,
                                alignSelf: 'flex-end'
                            }}
                            textStyle={{ color: '#6D6D71', fontWeight: '400' }}
                        />
                    </View>
                </View>
                <View style={{
                    height: 1, width: '100%',
                    backgroundColor: Theme.divider,
                }} />
                <View style={{
                    flexDirection: 'row', width: '100%',
                    justifyContent: 'space-between', alignItems: 'center',
                    paddingRight: 16,
                    height: 56
                }}>
                    <Text style={{
                        fontSize: 16,
                        color: '#7D858A'
                    }}>
                        {t('products.staking.calc.daily')}
                    </Text>
                    <View>
                        <Text style={{
                            fontWeight: '600',
                            fontSize: 16,
                            color: '#4FAE42'
                        }}>
                            {'~'}
                            <ValueComponent precision={bnIsLess(daily, 0.01) ? 6 : 2} value={daily} />
                            {' TON'}
                        </Text>
                        <PriceComponent
                            amount={daily}
                            style={{
                                backgroundColor: 'transparent',
                                paddingHorizontal: 0, paddingVertical: 2,
                                alignSelf: 'flex-end'
                            }}
                            textStyle={{ color: '#6D6D71', fontWeight: '400' }}
                        />
                    </View>
                </View>
            </View>
            <Text style={{
                color: '#8E979D',
                marginTop: -4,
                fontSize: 13,
                fontWeight: '400'
            }}>
                {t('products.staking.calc.note')}
            </Text>
        </>
    );
})