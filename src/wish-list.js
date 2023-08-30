import { LitElement, html, css } from "lit";
import "./agregar-cosas";

class WishList extends LitElement {
    static styles = css`

    :host{ //Le da formato a toda la etiqueta 
    }
    #lista{
        background-color: rgb(172, 150, 233);
        width:300px;
        height:350px;
        padding:20px;
        border-radius:30px;
        border: 4px dotted black;         
        
    }
    #pendientes{
        checkbox;
        list-style: none;
    }
    #buttonDone{
        font-family: 'Assistant', sans-serif;
        background-color: rgb(138, 228, 240);
        border-radius:10px;
        margin-left: 30%;
        margin-top:3%;
    }
    ul{
        list-style: none;
        padding-left:0;
    }
    li{
        margin-top:3%;
        margin-left:3%;
    }
    fieldset{
        border: 2px dotted black;             
        border-radius:20px;
    }
    legend{
        text-align: center;
    }
        /* Estilos para los elementos cumplidos */
        .completed {
            text-decoration: line-through;
            color: black;
        }
        /* Estilos para los elementos con más de 8 minutos */
        .overdue {
            color: red;
        }
        /* Estilos para los elementos con más de 5 minutos */
        .warning {
            color: yellow;
        }
        /* Estilos para los elementos con menos de 2 minutos */
        .soon {
            color: green;
        }

        /* Resto de los estilos */


    `;

    constructor() {
        super();
        this.items = [];
    }

    render() {
        return html`
            <div id="lista">
                <h1>My Wishlist</h1>
                <fieldset>
                    <legend>
                        <agregar-cosas @item-added=${this.handleItemAdded}></agregar-cosas>
                    </legend>
                    <form>
                        <ul id="pendiente">
                            ${this.items.map((item, index) => {
                                const now = Date.now();
                                const timeDiff = now - item.timestamp;
                                const minutesDiff = Math.floor(timeDiff / (1000 * 60));
                                
                                let classNames = "item";
                                if (item.completed) {
                                    classNames += " completed";
                                } else {
                                    if (minutesDiff >=8) {
                                        classNames += " overdue";
                                    } else if (minutesDiff >= 5) {
                                        classNames += " warning";
                                    } else if (minutesDiff < 2) {
                                        classNames += " soon";
                                    }
                                }
                                
                                return html`
                                    <li class=${classNames}>
                                        <input type="checkbox" id="pendiente${index}" @change=${(e) => this.handleCheckboxChange(index, e)}>
                                        ${item.value}
                                    </li>
                                `;
                            })}
                        </ul>
                        <input type="submit" value="Archive Done" id="buttonDone">
                    </form>
                </fieldset>
            </div>
        `;
    }

    handleItemAdded(event) {
        const newValue = event.detail;
        const timestamp = Date.now();
        this.items = [...this.items, { value: newValue, timestamp: timestamp, completed: false }];
        this.requestUpdate();
    }

    handleCheckboxChange(index, event) {
        this.items[index].completed = event.target.checked;
        this.requestUpdate();
    }
}

customElements.define('wish-list', WishList);
