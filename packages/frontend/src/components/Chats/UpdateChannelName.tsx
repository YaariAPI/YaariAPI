import { FormEvent, useContext, useState } from 'react'
import CloseButton from '@UI/CloseButton'
import InputLabel from '@UI/InputLabel'
import SubmitButton from '@UI/SubmitButton'
import { FaSyncAlt } from 'react-icons/fa'
import { ChatsContext } from '@Context/ChatsContext'
import { useMutation } from '@apollo/client'
import { updateChannelNameById } from '@pages/Mutation/Chats'
import { setItem } from '@utils/localStorage'

const UpdateChannelName = () => {
  const { isUpdateChannelName, setIsUpdateChannelName }: any = useContext(ChatsContext)
  const [channelNameChange, setChannelNameChange] = useState("")
  const [UpdateChannel] = useMutation(updateChannelNameById)
  const { chatsDetails, setChatsDetails } : any = useContext(ChatsContext)
  const HandleUpdateChannelName = async (event : FormEvent) => {
    // event.preventDefault();
    console.log(channelNameChange);
    setItem("chatsDetails", {
      ...chatsDetails,
      channelName : channelNameChange
    })
    
    try {
      const response = await UpdateChannel({ variables : {
        channelId: chatsDetails.channelId,
        updatedValue: channelNameChange
      } });
      console.log('Update channel name :', response.data);
      // const currentChannelDetails = chatsDetails
      
      setIsUpdateChannelName(false)
      setChannelNameChange("")
    } catch (err) {
      console.error('Error update channel name:', err);
    }
  }

  return (
    <>
      { isUpdateChannelName ? <div className="absolute z-11 inset-0  md:h-100% bg-stone-900/30 " >
        <CloseButton onClick={() => setIsUpdateChannelName(false) } 
                    right="md:right-120 right-4" top="top-60" />
        <form onSubmit={HandleUpdateChannelName} className="absolute top-[35%]  md:right-[35%] md:w-[30rem] bg-stone-100 p-10 rounded flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-center">Update Channel Name</h2>
          <div className='text-lg text-violet-600'>Current Channel Name : {chatsDetails.channelName}</div>
          <InputLabel type="text" name='update channel name' value={channelNameChange} HandleInputChange={(e : any) => setChannelNameChange(e.target.value)} title="Channel Name" placeholder="updated channel name" />
          <SubmitButton type="submit" Icon={FaSyncAlt} title='Submit' />
        </form>
      </div> : <></>}
    </>
  )
}

export default UpdateChannelName
