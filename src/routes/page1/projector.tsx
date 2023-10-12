import { Slot, component$, useContext } from "@builder.io/qwik";
import { searchContextId } from "./search-context-id";

/* export interface ProjectorProps{
    message: string;
    color:string;
} */

export const Projector = component$(()=>{
    const context = useContext(searchContextId);
    return <div><Slot /><span style={'color:'+context.colorSignal.value}> {context.messageSignal.value}</span></div>;
})