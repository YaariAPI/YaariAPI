import { FiExternalLink } from "react-icons/fi";
import { TemplateContext } from "@Context/TemplateContext";
import { useContext } from "react";

const TemplatePreview = ({ templatePreviewData } : any) => {
  

  return (
    <>
    { templatePreviewData.headerType !== 'NONE' || templatePreviewData.footerText || templatePreviewData.bodyText?
     <div className="bg-white max-w-xs min-w-xs mx-auto mt-15 overflow-hidden shadow-md font-sans border border-[#d0e3ea] pb-1">
      {/* Header with image */}
      <div className="relative">
        {templatePreviewData.headerType === 'IMAGE' ? <img
          src={templatePreviewData.fileUrl}
          alt="Media"
          className="w-full min-h-50 max-h-70 object-cover p-2 rounded"
        /> 
        : templatePreviewData.headerType === 'VIDEO' || 'DOCUMENT' ?
        <iframe
          src={templatePreviewData.fileUrl}
          className="w-full min-h-50 max-h-60 object-cover p-2 rounded"
        /> 
        :templatePreviewData.headerType === 'TEXT' ? <div className="px-3 pt-2 pb-1 font-semibold">{templatePreviewData.header_handle}</div>
        : <></>
        
        }
        {/* {
        templatePreviewData.headerType === 'TEXT' ? <div className="px-3 pt-2 pb-1 font-semibold">{templatePreviewData.header_handle}</div>
          : <></>
        } */}
      </div>

      {/* Body */}
      <div className="px-3 pb-2 text-sm text-gray-800">
        <p className="mb-2 whitespace-pre-line">
          {templatePreviewData.bodyText}
        </p>
      </div>


      {/* Footer */}
      <div className="px-3 pb-2 border-b-2 border-gray-200 flex justify-between ">
        <p className="text-[13.5px] text-gray-500">{templatePreviewData.footerText}</p>
        <p className="text-[10px] text-gray-500 self-end">12:00</p>
      </div>
      {JSON.stringify(templatePreviewData.button) !== '[]' ? 
        templatePreviewData.button.map((button : any) => <div className="flex gap-2 items-center justify-center p-2 text-blue-600 ">
        <FiExternalLink />
        <button className="text-sm font-semibold text-left">
          {button.text}
        </button>
      </div>)
       : <></>
        }
    </div>
    : <></>}
    </>
  );
};



export default TemplatePreview;