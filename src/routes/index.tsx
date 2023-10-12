import { Slot, component$, useContext, useContextProvider, useSignal, useTask$} from '@builder.io/qwik';
import { beerContextId } from './beer-context-id';
import { BeerSelector } from './beer-Selector';


export default component$(() => {
  const isMiskoVisibleSignal = useSignal<boolean>(false);
  const didHeGetABeerSignal = useSignal<boolean>(false);

  useContextProvider(beerContextId, didHeGetABeerSignal);

  useTask$(({track}) => {
    track(() => didHeGetABeerSignal.value);
    if(didHeGetABeerSignal.value){
      isMiskoVisibleSignal.value=true;
    }
  })

  return (
    <>
      <button onClick$={()=>{
        isMiskoVisibleSignal.value = !isMiskoVisibleSignal.value;
      }}>Ahoj!</button>

      <BeerGiver />

      {isMiskoVisibleSignal.value ?
        <Misko>I love Shai</Misko> : null}


    </>
  );
});

/* interface BeerGiverProps{
  gotBeerSignal: Signal<boolean>;
} */

export const BeerGiver = component$(()=>{
  return <div>
      <BeerSelector />
      <hr />
      <BeerGivingButton />
    </div>;
});


export const BeerGivingButton = component$(() => {
  const gotBeerSignal = useContext(beerContextId);
  return <button class="p-5 bg-amber-500 text-lg hover:bg-amber-200" onClick$={()=>{
    gotBeerSignal.value = !gotBeerSignal.value;
  }}>Give a Beer to Misko</button>
});

export const Misko = component$(()=>{
  return <div>
      <div>Hi I'm Misko Yayy</div>
      <Slot />
      
    </div>;
})