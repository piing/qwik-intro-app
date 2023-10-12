/* eslint-disable qwik/jsx-key */
import { component$, useResource$,Resource,useStylesScoped$ } from "@builder.io/qwik";
import  styles  from "./beer-selector.css?inline";

export interface Beer{
    name: string;
}
// /api/beers
export const BeerSelector = component$(() => {
    //http://localhost:5173/api/beers
    
    useStylesScoped$(styles);

    const beersResource = useResource$<Beer[]>(async ()=>{
        const result = await fetch('https://pmmczn-5173.csb.app/api/beers');
        return result.json();
    });

/*       const beers: Beer[] = [
        {name: 'ale'},
        {name: 'Stout'}
    ]; */
 
  return <div>

        <Resource value={beersResource}
            onPending={() => <span>Loading</span>}
            onRejected={(reason) => <span>error...{reason}</span>}
            onResolved={(beers) =>
                <select>
                 {beers.map((beer) => <option>{beer.name }</option>)}
                </select>
            }
        />
        <hr />
{/*              <select>
                {beers.map((beer) => <option>{beer.name }</option>)}
            </select>  */}
  </div>
});