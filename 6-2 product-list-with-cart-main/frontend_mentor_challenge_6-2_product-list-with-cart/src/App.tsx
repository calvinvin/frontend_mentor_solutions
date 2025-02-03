import dataJSON from "./data.json";
import { useRef, useState } from 'react'

interface IMenuJSON {
  image: {
    thumbnail: string,
    mobile: string,
    tablet: string,
    desktop: string,
  },
  name: string,
  category: string,
  price: number,
};

interface IShopItem extends IMenuJSON {
  amount: number;
}

function MenuCards({
  shopItems, handleShopItemChange,
}: {
  shopItems: Array<IShopItem>,
  handleShopItemChange: ( name: string, newValue: string ) => void,
}){
  function selectInputText(e: React.MouseEvent<HTMLInputElement>) {
    const inputElement = e.target as HTMLInputElement;
    inputElement.select();
  }
  function validateInput(e: React.CompositionEvent<HTMLInputElement>) {
    const inputElement = e.target as HTMLInputElement;
    const beforeValue = inputElement.value;
    const shopItemName = inputElement.name;
    inputElement.addEventListener(
      'input', 
      () => { 
        if (inputElement.validity.patternMismatch) {
          inputElement.value = beforeValue;
        } else {
          const newValue = inputElement.value;
          handleShopItemChange(shopItemName, newValue);
        }
        },
      { once: true }
    );
  }
  function pressInputButton(e: React.MouseEvent<HTMLButtonElement>, action: string) {
    const buttonElement = e.currentTarget as HTMLButtonElement;
    const inputWrapperElement = buttonElement.parentElement as HTMLDivElement;
    const inputElement = inputWrapperElement.querySelector("input");
    const shopItemName = inputElement!.name;
    if ( !inputElement ) return; 
    if ( action === 'minus' ) {
      const currentAmount = Number(inputElement.value);
      if ( currentAmount === 0 ) return;
      const newValue = String(Number(inputElement.value) - 1)
      inputElement.value = newValue;
      handleShopItemChange(shopItemName, newValue);
    }
    else if ( action === 'plus' ) {
      const newValue = String(Number(inputElement.value) + 1)
      inputElement.value = newValue;
      handleShopItemChange(shopItemName, newValue);
    }
  }
  function hideLabel(e: React.FocusEvent<HTMLDivElement>) {
    const divElement:HTMLDivElement = e.currentTarget;
    divElement.classList.add("hide-label");
  }
  function showLabel(e: React.FocusEvent<HTMLDivElement>) {
    const inputElement = e.target as HTMLInputElement;
    const divElement = inputElement.parentElement!.parentElement! as HTMLDivElement;
    divElement.classList.remove("hide-label");
  }
  return (
    shopItems.map(( shopItem:IShopItem, shopItemIndex: number )=> {
      const { image, name, category, price, amount } = shopItem;
      const shopItemId = `shop-item-${shopItemIndex}`;

      return (
        <li className={`menu-card ${(Number(amount) === 0) ? '' : 'menu-card____input-not-empty'}`} aria-labelledby={shopItemId} key={shopItemId}>
          <div className="menu-card__picture-wrapper">
            <picture className="menu-card__picture">
              <source srcSet={`.${image.mobile}`} media="(max-width: 587px)" />
              <source srcSet={`.${image.tablet}`} media="(max-width: 960px)" />
              <img className="menu-card__img" src={`.${image.desktop}`} alt=""/>
            </picture>
            <div className="menu-card__field-wrapper" onFocus={hideLabel} onBlur={(e)=>{setTimeout(()=>showLabel(e), 300)}}>
              <label className="menu-card__label" htmlFor={`input-${shopItemId}`}>
                <img className="menu-card__label-icon" src="../assets/images/icon-add-to-cart.svg"></img>
                <span className="menu-card__label-add-to-cart">Add to Cart</span>
              </label>
              <div className="menu-card__input-wrapper">
                <button className="menu-card__input-button" type="button" onClick={(event)=>pressInputButton(event, 'minus')} aria-label="add one amount"><img src="../assets/images/icon-decrement-quantity.svg" alt=""></img></button>
                <input className="menu-card__input" onClick={selectInputText} onBeforeInput={validateInput} onChange={()=>{}} id={`input-${shopItemId}`} name={name} value={ amount } type="text" inputMode="numeric" pattern="[0-9]+" aria-label="subtotal item amount"></input>
                <button className="menu-card__input-button" type="button" onClick={(event)=>pressInputButton(event, 'plus')}  aria-label="minus one amount"><img src="../assets/images/icon-increment-quantity.svg" alt=""></img></button>
              </div>
            </div>
          </div>
          <p className="menu-card__category" aria-able="shop-item-category">{category}</p>
          <h3 className="menu-card__name" id={shopItemId}>{name}</h3>
          <p className="menu-card__price" aria-label="shop-item-price">{`$${price.toFixed(2)}`}</p>
        </li>
      );
    })
  )
}

function Menu({
  shopItems, handleShopItemChange,
}: {
  shopItems: Array<IShopItem>,
  handleShopItemChange: ( name: string, newValue: string ) => void,
}) {
  return (
    <section className="menu" aria-labelledby="menu-heading">
      <h1 className="menu__heading" id="menu-heading">Desserts</h1>
      <form id="shop-form" className="menu__form">
        <ul className="menu__cards-wrapper" role="list" aria-label="menu items">
          <MenuCards shopItems={shopItems} handleShopItemChange={handleShopItemChange}/>
        </ul>
      </form>
    </section>
  )
}

function CartCard({
  cartItems, handleShopItemChange,
}: {
  cartItems: Array<IShopItem>,
  handleShopItemChange: ( name: string, newValue: string ) => void,
}) {
  function removeShopItem(e: React.MouseEvent<HTMLButtonElement>) {
    const buttonElement = e.currentTarget as HTMLButtonElement;
    const shopItemName = buttonElement.dataset.shopitemname!;
    const newValue = String(0);
    handleShopItemChange(shopItemName, newValue);
  }
  return (
    <>
      {cartItems.map(( cartItem, cartItemIndex: number ) => {
        const { name, amount, price } = cartItem;
        const subTotal = (Number(cartItem.price) * cartItem.amount).toFixed(2);
        const cartItemId = `cart-item-${cartItemIndex}`;
        return(
          <li className="cart__card" aria-labelledby={cartItemId} key={cartItemId}>
            <div className="cart__content-wrapper">
              <h3 className="cart__card-name item-heading" id={cartItemId}>{name}</h3>
              <div className="cart__card-price-wrapper">
                <span className="cart__card-amount item-amount">{amount}</span>
                <span className="cart__card-price item-price">{price.toFixed(2)}</span>
                <span className="cart__card-subtotal item-subtotal">{subTotal}</span>
              </div>
            </div>
            <button className="cart__card-remove-item-button" data-shopitemname={name} onClick={removeShopItem}><svg className="cart__card-remove-item-svg" xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg></button>
          </li>
        )
      })}
    </>
  )
}

function Cart({ 
  shopItems, handleShopItemChange,
  modalRef,
}: {
  shopItems: Array<IShopItem>,
  handleShopItemChange: ( name: string, newValue: string ) => void,
  modalRef: React.RefObject<HTMLDialogElement>,
}) {
  const cartItems = shopItems.filter(item=>Number(item.amount)!==0);
  const emptyCart = ( cartItems.length === 0 );
  const totalItems = cartItems.reduce(( accumulator, currentItem ) => Number(accumulator) + Number(currentItem.amount), 0);
  const totalPrice = cartItems.reduce(( accumulator, currentItem ) => Number(accumulator) + Number(currentItem.amount) * Number(currentItem.price), 0);
  function confirmOrder() {
    modalRef.current?.showModal();
  }
  return (
    <section className={`cart ${emptyCart ? "cart____empty" : "" }`} aria-labelledby="cart-heading">
      <h2 className="cart__heading" id="cart-heading">Your Cart({totalItems})</h2>
      <ul className="cart__cards-wrapper" role="list" aria-label="shopping cart items">
        <CartCard cartItems={cartItems} handleShopItemChange={handleShopItemChange}/>
        <div className="cart__total-price-wrapper total-price-wrapper">
          <span className="cart__total-price-heading total-price-heading">Order Total</span>
          <span className="cart__total-price-amount total-price-amount">{String(totalPrice.toFixed(2))}</span>
        </div>
        <div className="cart__comment-wrapper">
          <img src="../assets/images/icon-carbon-neutral.svg" alt=""></img>
          <p className="cart__comment">This is a <em className="cart__comment-em">carbon-neutral</em> delivery</p>
        </div>
        <button className="cart__confirm-button" type="button" onClick={confirmOrder} aria-label="confirm purchase order">Confirm Order</button>
      </ul>
      <div className="cart__empty-wrapper">
        <img className="cart__empty-img" src="../assets/images/illustration-empty-cart.svg" alt=""></img>
        <p className="cart__empty-description">Your added items will appear hear</p>
      </div>
    </section>
  )
}

function ConfirmCard({ 
  shopItems 
}: {
  shopItems: Array<IShopItem>,
}){
  const cartItems: Array<IShopItem> = shopItems.filter( shopItem => Number(shopItem.amount) !== 0 );
  return (
    <>
      {cartItems.map(( cartItem, cartItemIndex: number )=> {
        const {name, amount, price, image: { thumbnail }} = cartItem;
        const subtotal = (Number(amount) * Number(price)).toFixed(2);
        const confirmItemId = `confirm-item-${cartItemIndex}`;
        return (
          <li className="confirm__card" aria-labelledby={confirmItemId} key={confirmItemId}>
            <img className="confirm__card-thumbnail" src={`.${thumbnail}`}></img>
            <div className="confirm__card-content-wrapper">
              <h3 className="confirm__card-heading item-heading" id={confirmItemId}>{name}</h3>
              <span className="confirm__card-amount item-amount">{amount}</span>
              <span className="confirm__card-price item-price">{price}</span>
            </div>
            <span className="confirm__card-subtotal item-subtotal">{subtotal}</span>
          </li>
        )
      }
        
      )}
    </>
  )
}
function Confirm({
  shopItems, modalRef, clearShopItems,
}: {
  shopItems: Array<IShopItem>,
  modalRef: React.RefObject<HTMLDialogElement>,
  clearShopItems: ()=>void,
}) {
  function closeModal(e: React.MouseEvent<HTMLDialogElement>) {
    const modalElement = e.currentTarget;
    const clickTarget = e.target;
    const button = modalElement.querySelector("button");
    if ((clickTarget === modalElement) || (clickTarget === button) ) {
      modalElement.close();
      clearShopItems();
    }
  }
  const totalPrice = shopItems.reduce((accumulator, shopItem)=>accumulator + Number(shopItem.amount) * Number(shopItem.price), 0);
  return (
    <dialog className="confirm" ref={modalRef} onClick={closeModal} aria-labelledby="confirm-heading">
      <div className="confirm__wrapper">
        <img className="confirm__icon" src="../assets/images/icon-order-confirmed.svg" alt=""></img>
        <h2 className="confirm__heading" id="confirm-heading">Order confirmed</h2>
        <p className="confirm__description">We hope you enjoy your food!</p>
        <ul className="confirm__cards-wrapper" role="list" aria-label="confirmed order items">
          <ConfirmCard shopItems={shopItems}/>
          <div className="confirm__total-price-wrapper total-price-wrapper">
            <span className="confirm__total-price-heading total-price-heading">Order Total</span>
            <span className="confirm__total-price-amount total-price-amount">{totalPrice.toFixed(2)}</span>
          </div>
        </ul>
        <button className="confirm__button" type="button">Start New Order</button>
      </div>
    </dialog>
  )
}

function App() {
  const menuJSON: Array<IMenuJSON> = dataJSON;
  const [shopItems, updateShopItems] = useState<Array<IShopItem>>(
    menuJSON.map(( shopItem: IMenuJSON ) => {
    return { ...shopItem, amount: 0, }
  }));
  const modalRef = useRef<HTMLDialogElement>(null);
  function returnNewShopItems(shopItems: Array<IShopItem>, name: string, newValue: string): Array<IShopItem> {
    return shopItems.map( shopItem => (shopItem.name === name) ? { ...shopItem, amount: newValue } : shopItem ) as Array<IShopItem>;
  }
  function handleShopItemChange(name: string, newValue: string) {
    updateShopItems(returnNewShopItems(shopItems, name, newValue));
  }
  function clearShopItems() {
    updateShopItems(shopItems.map((shopItem: IShopItem)=>{ 
      return {...shopItem, amount: 0}
    }));
  }
  
  return (
    <main className="main">
      <Menu shopItems={shopItems} handleShopItemChange={handleShopItemChange}/>
      <Cart shopItems={shopItems} handleShopItemChange={handleShopItemChange} modalRef={modalRef}/>
      <Confirm shopItems={shopItems} modalRef={modalRef} clearShopItems={clearShopItems}/>
    </main>
  )
}

export default App
