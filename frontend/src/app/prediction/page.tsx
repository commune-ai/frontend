"use client"

const prediction = () => {

    return (
        <div className="px-[30px] py-[20px] dark:bg-[#212324] dark:text-white    mb-[10px] my-auto min-h-[860px]">
            <h1>Recent predictions</h1>
            <table className="w-full mt-[20px] ">
                <thead>
                    <tr className="border-b-[1px] border-gray-600">
                        <th className="w-[20%] text-left p-[10px]">ID</th>
                        <th className="w-[20%] text-left p-[10px]">Model</th>
                        <th className="w-[20%] text-left p-[10px]">Source</th>
                        <th className="w-[15%] text-left p-[10px]">Status</th>
                        <th className="w-[15%] text-left p-[10px]">Run time</th>
                        <th className="w-[10%] text-left p-[10px]">Created</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b-[1px] border-gray-600">
                        <td className="p-[10px]">5hh7zatbvvo5g62rkyald72v5a</td>
                        <td className="p-[10px]">stability-ai/sdxl</td>
                        <td className="p-[10px]">API</td>
                        <td className="p-[10px]">
                            <div className="w-[90px] p-[5px] bg-emerald-200 text-emerald-600 border-[1px] border-emerald-600">
                                Succeeded
                            </div>
                        </td>
                        <td className="p-[10px]">11.5s</td>
                        <td className="p-[10px]">2 hours ago</td>
                    </tr>
                    <tr className="border-b-[1px] border-gray-600">
                        <td className="p-[10px]">5hh7zatbvvo5g62rkyald72v5a</td>
                        <td className="p-[10px]">stability-ai/sdxl</td>
                        <td className="p-[10px]">API</td>
                        <td className="p-[10px]">
                            <div className="w-[90px] p-[5px] bg-red-200 text-red-600 border-[1px] border-red-600">
                                Failed
                            </div>
                        </td>
                        <td className="p-[10px]">5s</td>
                        <td className="p-[10px]">4 hours ago</td>
                    </tr>
                    <tr className="border-b-[1px] border-gray-600">
                        <td className="p-[10px]">5hh7zatbvvo5g62rkyald72v5a</td>
                        <td className="p-[10px]">stability-ai/sdxl</td>
                        <td className="p-[10px]">API</td>
                        <td className="p-[10px]">
                            <div className="w-[90px] p-[5px] bg-emerald-200 text-emerald-600 border-[1px] border-emerald-600">
                                Succeeded
                            </div>
                        </td>
                        <td className="p-[10px]">7s</td>
                        <td className="p-[10px]">5 hours ago</td>
                    </tr>
                    <tr className="border-b-[1px] border-gray-600">
                        <td className="p-[10px]">5hh7zatbvvo5g62rkyald72v5a</td>
                        <td className="p-[10px]">stability-ai/sdxl</td>
                        <td className="p-[10px]">API</td>
                        <td className="p-[10px]">
                            <div className="w-[90px] p-[5px] bg-emerald-200 text-emerald-600 border-[1px] border-emerald-600">
                                Succeeded
                            </div>
                        </td>
                        <td className="p-[10px]">9s</td>
                        <td className="p-[10px]">6 hours ago</td>
                    </tr>
                    <tr className="border-b-[1px] border-gray-600">
                        <td className="p-[10px]">5hh7zatbvvo5g62rkyald72v5a</td>
                        <td className="p-[10px]">stability-ai/sdxl</td>
                        <td className="p-[10px]">API</td>
                        <td className="p-[10px]">
                            <div className="w-[90px] p-[5px] bg-emerald-200 text-emerald-600 border-[1px] border-emerald-600">
                                Succeeded
                            </div>
                        </td>
                        <td className="p-[10px]">13s</td>
                        <td className="p-[10px]">6 hours ago</td>
                    </tr>

                </tbody>
            </table>

        </div>
    )
}

export default prediction;