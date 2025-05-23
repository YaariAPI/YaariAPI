import { gql } from "@apollo/client";

export const SUBMIT_TEMPLATE = gql`
mutation SubmitTemplate($templateData: TemplateRequestInput!) {
  submitTemplate(templateData: $templateData) {
    success
    data
    error
  }
}
`;

export const GET_TEMPLATE_STATUS = gql`
query GetTemplateStatus($templateId: String!) {
  getTemplateStatus(templateId: $templateId) {
    success
    data
    error
  }
}
`;


export const Find_ALL_TEMPLATE = gql`
query findAllTemplate {
    findAllTemplate {
      account
      bodyText
      button {
        phone_number
        text
        type
        url
      }
      category
      footerText
      headerType
      header_handle
      id
      language
      status
      templateId
      templateName
  }
}
`


// export const UPLOAD_FILE_TO_WHATSAPP = gql`
//   mutation UploadFileToWhatsApp($file: Upload!) {
//     uploadFileToWhatsApp(file: $file)
//   }
// `;