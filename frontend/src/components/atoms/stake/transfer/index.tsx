import React from "react"
import { useForm } from "react-hook-form"
import StakingDisclaimer from "../disclaimer"
import { useGetBalanceQuery, useGetValidatorsQuery } from "@/app/api/staking/modulelist"
import { ValidatorType } from "@/app/api/staking/type"
import { Input } from "@/components/atoms/input"
import SelectComp from "@/components/atoms/select"
import { usePolkadot } from "@/context"
import Button from "@/utils/button"
import { formatTokenPrice } from "@/utils/tokenPrice"

const TransferStakingForm = ({
  validator,
  callback,
}: {
  validator: ValidatorType | undefined
  callback?: () => void
}) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "all",
  })
  const { transferStake, selectedAccount } = usePolkadot()

  const { data: validatorData } = useGetValidatorsQuery()
  const { data: balanceData } = useGetBalanceQuery(
    { wallet: String(selectedAccount?.address) },
    {
      skip: !selectedAccount,
    },
  )

  const onSubmit = (data: any) => {
    transferStake({
      amount: String(data.stakeAmount),
      validatorFrom: String(validator?.key),
      validatorTo: String(data.validator.value),
      callback,
    })
  }

  return (
    <form className="space-y-1 w-full" onSubmit={handleSubmit(onSubmit)}>
      <SelectComp
        label="Select Module"
        name="validator"
        isSearchable
        placeholder=""
        value={{
          label: "vali::comstats",
          value: "5H9YPS9FJX6nbFXkm9zVhoySJBX9RRfWF36abisNz5Ps9YaX",
        }}
        options={validatorData?.map((d) => ({
          label: d.name,
          value: d.key,
        }))}
        control={control}
        errors={errors["validator"]}
        rules={{ required: "Module is required" }}
      />
      <div className="pt-3">
        <Input
          type="number"
          placeholder=""
          register={register}
          name="stakeAmount"
          rules={{
            required: "Stake Amount is Required",
          }}
          errors={errors.stakeAmount}
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
      <StakingDisclaimer />
      <Button
        size="large"
        variant="primary"
        className="w-full justify-center"
        onClick={() => {}}
      >
        Transfer $COMAI
      </Button>
    </form>
  )
}

export default TransferStakingForm
