import { useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { useMutation, useQuery } from "@apollo/client"
import { TemplateContext } from "@components/Context/TemplateContext"
import { findWaAllTemplate, GET_TEMPLATE_STATUS } from "@src/generated/graphql"
import { convertRawPayloadToPreviewData } from "@src/utils/rawPayloadtoPreviewTemplate"
import { FiEdit2 } from "react-icons/fi"
import { GrDocumentUpdate } from "react-icons/gr";

const TemplateTable = ({ setIsTemplateFormVis, setIsTemplatePreviewVis }: any) => {
    const { setTemplateFormData, setTemplateStatusAId }: any = useContext(TemplateContext)
    const navigate = useNavigate()
    const [templates, setTemplates] = useState([{
        id: '',
        status: '',
        waTemplateId: '',
        templateName: '',
        category: '',
    }])

    const [GetTemplateStatus] = useMutation(GET_TEMPLATE_STATUS);

    const HandelSendTemplate = (templateId: string, templateName: string) => {
        navigate("/broadcast", {
            state: {
                templateId,
                templateName
            },
        });
    }

    const { data: templateData, loading: templateLoading, refetch: templateRefetch }: any = useQuery(findWaAllTemplate);
    useEffect(() => {
        templateRefetch()
        if (templateData && !templateLoading) {
            setTemplates(templateData.findAllTemplate)
        }
    }, [templateData])

    const HandleTempalteStatus = (templateId: string) => {
        GetTemplateStatus({
            variables: { templateId },
        })
    }

    return (
        <div>
            <div className="relative overflow-x-auto md:pt-4 md:p-4 rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-stone-500 rounded-2xl">
                    <thead className="text-xs text-stone-700 uppercase bg-stone-200 truncate">
                        <tr>
                            <th scope="col" className="px-6 py-4 w-64 text-left truncate">Template Name</th>
                            <th scope="col" className="px-6 py-4 text-center truncate">Template Id</th>
                            <th scope="col" className="px-6 py-4 text-center truncate">Status</th>
                            <th scope="col" className="px-6 py-4 text-center truncate">Category</th>
                            <th scope="col" className="px-6 py-4 text-center truncate">Update</th>
                            <th scope="col" className="px-6 py-4 text-center truncate">Check Template Status</th>
                            <th scope="col" className="px-6 py-4 text-center truncate">preview</th>
                            <th scope="col" className="px-6 py-4 text-center truncate">Send Template</th>
                        </tr>
                    </thead>
                    <tbody>
                        {templates?.map((template: any, index: number) => (
                            <tr key={index} className="bg-white border-b border-stone-200">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-left text-stone-900 max-w-[200px] truncate"
                                    title={template.templateName}
                                >
                                    {template.templateName}
                                </th>
                                <td
                                    className="px-6 py-4 text-center truncate max-w-[150px]"
                                    title={template.waTemplateId}
                                >
                                    {template.waTemplateId}
                                </td>
                                <td
                                    className="px-6 py-4 text-center truncate max-w-[150px]"
                                    title={template.status}
                                >
                                    <div className="flex items-center justify-center">
                                        {template.status.toLowerCase() == "approved" ? <p className="p-1.5 bg-green-600 rounded-full "></p> : <></>}
                                        {template.status.toLowerCase() == "rejected" ? <p className="p-1.5 bg-red-600 rounded-full "></p> : <></>}
                                        {template.status.toLowerCase() == "pending" ? <p className="p-1.5 bg-yellow-600 rounded-full "></p> : <></>}
                                        {template.status.toLowerCase() == "saved" ? <p className="p-1.5 bg-yellow-600 rounded-full "></p> : <></>}
                                        <p className="p-2">{template.status.toUpperCase()}</p>
                                    </div>

                                </td>
                                <td
                                    className="px-6 py-4 text-center truncate max-w-[150px]"
                                    title={template.category}
                                >
                                    {template.category.toUpperCase()}
                                </td>
                                <td className="px-4 py-2 text-center">
                                    <button
                                        disabled = {template.status.toLowerCase() === 'pending'}
                                        onClick={() => {
                                    //         const templatePreviewData = convertRawPayloadToPreviewData(template.rawComponents);
                                    // setTemplateFormData({
                                    //     accountId : template.accountId,
                                    //     templateName: template.templateName,
                                    //     category: template.category,
                                    //     language: template.language,
                                    //     ...templatePreviewData})
                                    setTemplateStatusAId({
                                        dbTemplateId : template.id,
                                        status : template.status.toLowerCase()
                                    })
                                    setIsTemplateFormVis(true)
                                        }}
                                        className={`text-lg text-center text-violet-500 cursor-pointer hover:bg-violet-200 p-2 rounded disabled:bg-violet-200 disabled:cursor-default`}
                                    >
                                        <GrDocumentUpdate />
                                    </button>
                                </td>
                                <td onClick={() => HandleTempalteStatus(template.waTemplateId)}
                                    className="px-6 py-4 text-center truncate max-w-[150px] underline text-blue-500 hover:text-blue-700 cursor-pointer"
                                    title="sendTemplate"
                                >
                                    Check Template Status
                                </td>
                                <td onClick={() => {
                                    const templatePreviewData = convertRawPayloadToPreviewData(template.rawComponents);
                                    setTemplateFormData(templatePreviewData)
                                    setIsTemplatePreviewVis(true)
                                }}
                                    className="px-6 py-4 text-center truncate max-w-[150px] underline text-blue-500 hover:text-blue-700 cursor-pointer"
                                    title="sendTemplate"
                                >
                                    preview
                                </td>
                                <td onClick={() => HandelSendTemplate(template.id, template.templateName)}
                                    className="px-6 py-4 text-center truncate max-w-[150px] underline text-blue-500 hover:text-blue-700 cursor-pointer"
                                    title="sendTemplate"
                                >
                                    send template
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TemplateTable
