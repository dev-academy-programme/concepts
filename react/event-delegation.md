In order to respond to user events, component functions can be bound to [virtual] DOM events. In this example, an `addToCart` function in the `<ItemList />` component is called when a button is clicked in the `<Item />` component.

```js
// ItemList.js
import React from 'react'
import Item from './Item'

class ItemList extends React.Component {
   
  constructor(props) {
    super(props)
    this.addToCart.bind(this)
  }

  addToCart (itemID) {
    console.log(itemID)
  }

  render () {
    return (
      <div className="item-list">
        {this.props.items.map((item) => {
          return <Item
            key={item.id}
            name={item.name}
            addToCart={this.addToCart}
          />
        })}
      </div>
    )
  },
}

export default ItemList
```

Notice how the local `addToCart` function is being passed as a prop to the `<Item />` component. Additionally, notice how an `itemID` argument is passed to the `addToCart` function. This is how the parent component knows which item we are adding to the cart.

```js
// Item.js
import React from 'react'

class Item extends React.Component {
  
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.props.addToCart(this.props.id)
  }

  render () {
    return (
      <div className="item">
        <h2>{this.props.name}</h2>
        <button onClick={this.handleClick}>Add to Cart</button>
      </div>
    )
  }
}

export default Item
```

The `addToCart` event handler is used directly from `this.props` in Item.js.

