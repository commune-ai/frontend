import React from "react"
import { useForm } from "react-hook-form"
import StakingDisclaimer from "../disclaimer"
import { useGetBalanceQuery } from "@/app/api/staking/modulelist"
import { ValidatorType } from "@/app/api/staking/type"
import { Input } from "@/components/atoms/input"
import { infoToast } from "@/components/atoms/toast"
import { usePolkadot } from "@/context"
import { formatTokenPrice } from "@/utils/tokenPrice"
import { Button } from "antd"

const AddStakingForm = ({
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

  const { addStake, selectedAccount } = usePolkadot()
  const { data: balanceData } = useGetBalanceQuery(
    { wallet: String(selectedAccount?.address) },
    {
      skip: !selectedAccount,
    },
  )

  const onSubmit = (data: any) => {
    if (Number(balanceData?.balance) / 10 ** 9 < Number(data.stakeAmount)) {
      infoToast("Insufficient Balance")
      return
    }
    addStake({
      validator:
        validator?.key || String(process.env.NEXT_PUBLIC_COMSTAT_VALIDATOR),
      amount: data.stakeAmount,
      callback,
    })
  }
  return (
    <form className="space-y-2 w-full" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input
          type="number"
          placeholder=""
          maxButton
          handleMaxClick={(e: any) => {
            e.preventDefault()
            setValue(
              "stakeAmount",
              formatTokenPrice({
                amount: Number(balanceData?.balance) - 1000,
                precision: 9,
              }),
            )
          }}
          register={register}
          name="stakeAmount"
          errors={errors["stakeAmount"]}
          rules={{
            required: "Amount is required",
            min: {
              value: 0.000001,
              message: "Minimum staking amount is 0.000001 COMAI",
            },
          }}
        />
      </div>
      <StakingDisclaimer />

      <Button
        size="large"
        // isLoading
        type="primary"
        className="w-full flex items-center justify-center text-black dark:text-black"
        onClick={() => { }}
      >
        Stake $COMAI
      </Button>
    </form>
  )
}

export default AddStakingForm
