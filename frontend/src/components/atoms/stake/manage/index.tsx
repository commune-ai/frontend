import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useGetValidatorsQuery } from "@/app/api/staking/modulelist";
import StakingModal from "@/components/atoms/modal/stake"
import SelectComp from "@/components/atoms/select"
import Button from '@/utils/button';

const ManageStakingForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "all",
  })
  const [validatorId, setValidatorId] = useState("")
  const [open, setOpen] = useState(false)
  const { data: validatorData } = useGetValidatorsQuery()

  const onSubmit = (data: any) => {
    setValidatorId(data.validator.value)
    setOpen(true)
  }

  return (
    <form className="space-y-1 w-full my-4" onSubmit={handleSubmit(onSubmit)}>
      <SelectComp
        label="Which module you would like to manage?"
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
      <div className="pt-4">
        <Button
          size="large"
          variant="primary"
          className="w-full justify-center"
          onClick={() => {}}
        >
          Select a Validator
        </Button>
      </div>
      <StakingModal open={open} setOpen={setOpen} validatorId={validatorId} />
    </form>
  )
}

export default ManageStakingForm
