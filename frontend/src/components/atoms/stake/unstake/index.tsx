import React from "react"
import { useForm } from "react-hook-form"
import { useGetBalanceQuery } from "@/app/api/staking/modulelist"
import { ValidatorType } from "@/app/api/staking/type"
import { Input } from "@/components/atoms/input"
import { usePolkadot } from "@/context"
import Button from '@/utils/button';
import { formatTokenPrice } from "@/utils/tokenPrice"

const UnstakingForm = ({
  validator,
  callback,
}: {
  validator: ValidatorType | undefined
  callback?: () => void
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "all",
  })

  const { selectedAccount, removeStake } = usePolkadot()
  const { data: balanceData } = useGetBalanceQuery(
    { wallet: String(selectedAccount?.address) },
    {
      skip: !selectedAccount,
    },
  )
  const onSubmit = (data: any) => {
    removeStake({
      amount: String(data.stakeAmount),
      validator: String(validator?.key),
      callback,
    })
  }
  return (
    <form className="space-y-4 w-full" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input
          type="number"
          placeholder=""
          register={register}
          name="stakeAmount"
          errors={errors["stakeAmount"]}
          rules={{
            required: "Unstake Amount is Required",
            min: {
              value: 0.000000001,
              message: "Minimum Unstake Amount is 0.000000001 COMAI",
            },
          }}
          maxButton
          handleMaxClick={(e: any) => {
            e.preventDefault()
            setValue(
              "stakeAmount",
              formatTokenPrice({
                amount: Number(
                  balanceData?.stakes?.find(
                    (item) => item.validator.key === validator?.key,
                  )?.amount,
                ),
                precision: 9,
              }),
            )
          }}
        />
      </div>
      {/* <StakingDisclaimer /> */}

      <Button
        size="large"
        variant="primary"
        className="w-full justify-center"
        onClick={() => {}}
      >
        Unstake $COMAI
      </Button>
    </form>
  )
}

export default UnstakingForm
