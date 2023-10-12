import { component$, useContextProvider, useSignal, useTask$} from '@builder.io/qwik';
import { Projector } from './projector';
import { searchContextId } from './search-context-id';

export default component$(() => {

  const messageSignal = useSignal<string>('');
  const colorSignal = useSignal<string>('black');
  useContextProvider(searchContextId, {
    messageSignal,
    colorSignal
  });

  useTask$(({track}) =>{
    track(()=>messageSignal.value);
    if(messageSignal.value.indexOf('llama')!==-1){
      colorSignal.value='red'
    }else{
      colorSignal.value='black'
    }
  });

  return <div>
    This is Page 1

    <hr />
    
    {/* <input type="text" placeholder="Type your search" onKeyDown$={(event)=>{
      console.log(event.key);
    }}/> */}
   
   <input type="text" placeholder="Type your search" onInput$={(event)=>{
    messageSignal.value = (event.target as HTMLInputElement).value;
   }}/> 
    <hr />
    <Projector>Your message is:</Projector>
    
  </div>
});

