export const convertRawPayloadToPreviewData = (rawComponents: any[]) => {
  const previewData: any = {
    headerType: 'NONE',
    fileUrl: '',
    header_handle: '',
    bodyText: '',
    footerText: '',
    button: [],
  };

  for (const component of rawComponents) {
    switch (component.type) {
      case 'HEADER':
        previewData.headerType = component.format;
        if (component.format === 'TEXT') {
          previewData.header_handle = component.text;
        } else if (['IMAGE', 'VIDEO', 'DOCUMENT'].includes(component.format)) {
          previewData.fileUrl = component.example?.header_handle?.[0] || '';
        }
        break;
      case 'BODY':
        previewData.bodyText = component.text;
        console.log(component,'.........................');
        
        const variableValues = component.example?.body_text?.[0] || [];
        previewData.variables = variableValues.map((val: string, idx: number) => ({
          name: `{{${idx + 1}}}`,
          value: val
        }));
        break;
      case 'FOOTER':
        previewData.footerText = component.text;
        break;
      case 'BUTTONS':
        previewData.button = component.buttons;
        break;
    }
  }

  return previewData;
};
