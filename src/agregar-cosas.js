import { LitElement,html,css} from "lit";

class AgregarCosas extends LitElement{

    static styles=css`
    #addButton{
        border-radius:15px;
        font-family:'Assistant', sans-serif;
        background-color: rgb(135, 215, 85);
    }
    #inputText{
        border-radius:20px;
    }
    `

    
    render(){
        return html`
        <div>
            <input type="text" size="20" id="inputText" placeholder="Que pendiente tienes:">
            <input type="button" value="Agregar" id="addButton" @click=${this.enlistar}>      
        </div>
        
        `;
    }
    
    enlistar(){
        const inputText=this.shadowRoot.getElementById("inputText");
        const valor=inputText.value;

        const event=new CustomEvent('item-added',{
            detail:valor,
            bubbles:true,
            composed:true
        });
        this.dispatchEvent(event);
        //Limpiar lista
        inputText.value='';
    }

}    


customElements.define('agregar-cosas',AgregarCosas); 