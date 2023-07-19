import { Link } from 'react-router-dom';

import LinkButton from '../../ui/LinkButton';

function EmptyCart() {
  return (
    <div className='mt-5'>
      <LinkButton to="/menu"><span className=' text-base'>&larr; Back to menu</span></LinkButton>

      <p className="font-bold mt-7 font-" >Your cart is still empty. Start adding some pizzas :)</p>
    </div>
  );
}

export default EmptyCart;