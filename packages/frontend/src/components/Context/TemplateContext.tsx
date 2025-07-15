import { createContext, useState } from "react";

interface TemplateContextProps {
  templateFormData: any,
  setTemplateFormData: Function,
  templateStatusAId: any,
  setTemplateStatusAId: Function
}

export const TemplateContext = createContext<TemplateContextProps | undefined>(undefined)

export const TemplateProvider = ({ children }: any) => {
  const [templateFormData, setTemplateFormData] = useState({
    accountId: '',
    templateName: '',
    category: 'UTILITY',
    language: 'en_US',
    bodyText: `Hi {{1}},
Your order *{{2}}* from *{{3}}* has been shipped.
To track the shipping: {{4}}
Thank you.`,
    footerText: '',
    headerType: 'NONE',
    header_handle: '',
    button: [],
    variables: [],
    fileUrl: '',
    headerText: '',
    attachmentId: null
  });
  const [ templateStatusAId, setTemplateStatusAId ] = useState({
    dbTemplateId : '',
    status : '',
    attachmentId: null
  });

//   const [templateData, setTemplateData] = useState({
//     account: '',
//     templateName: '',
//     category: 'UTILITY',
//     language: 'en_US',
//     bodyText: `Hi {{1}},
// Your order *{{2}}* from *{{3}}* has been shipped.
// To track the shipping: {{4}}
// Thank you.`,
//     footerText: '',
//     button: [],
//     variables: [],
//     headerType: 'NONE',
//     header_handle: '',
//     fileUrl: ''
//   });

  return (
    <TemplateContext.Provider value={{
      templateFormData,
      setTemplateFormData,
      templateStatusAId, 
      setTemplateStatusAId
    }}>
      {children}
    </TemplateContext.Provider>
  )
}