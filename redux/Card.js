export const additem=(item)=>(
    {
type:"additem",
payload:item
    }
)


export const removeitem=(item)=>(
{
type:"removeitem",
payload:item
}
)
export const updateItem = (item) => (
  {
    type:"uptadeItem",
    payload:item
  }
)
export const showcomment=(bool , item)=>(
  {
  type: "showcomment",
  payload:bool,
  payload2:item
  }
  )


/**  utils*/



  
 


/* ınıtal_state */

const INITIAL_STATE = {
   
    cartItems: [],
    commentFocus : false,
    postId: 0,

  };
  
  function updater(newItem,cartItems){
        if (newItem.type === "added") {
          cartItems.push(newItem.props)
            return cartItems;
        }
        if (newItem.type === "modified") {
         
           const newCartItem = cartItems.map(item=>
              {
                
              })
            return(newCartItem);
        }
        if (newItem.type === "removed") {
            const newCartItem = cartItems.filter(item=>
               item.id !== newItem.props.id
              )
            return (newCartItem)
        }
  }



  /* reducers */
  const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
     
      case "additem":
        return {
          ...state,
          cartItems: action.payload
        };
      case "removeitem":
        return {
          ...state,
          cartItems: action.payload
        };
      case "showcomment":
        return{
          ...state,
          commentFocus: action.payload,
          postId: action.payload2
        }
      case "uptadeItem" :
        return{
          ...state,
          cartItems: updater(action.payload,state.cartItems)
        }
      default:
        return state;
    }
  };
  
  export default cartReducer;