import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure/useAxiosSecure';
import useCart from '../../../Hooks/useCart/useCart';
import { AuthContext } from '../../../Shard/AuthProvider/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = () => {
    const [error, setError] = useState('')
    const { user } = useContext(AuthContext);
    const [clientSecret, setClientSecret] = useState('');
    const [trantionId, setTrantionId] = useState('')
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()
    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0)

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    setClientSecret(res.data.clientSecret)
                })
        }

    }, [axiosSecure, totalPrice])


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error.message);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('')
        }


        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if (confirmError) {
            console.log('confirm Error', confirmError)
        }
        else {
            console.log('Payment Intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log('trantion id', paymentIntent.id)
                setTrantionId(paymentIntent.id)

                const payment = {
                    email: user.email,
                    price: totalPrice,
                    trantionId: paymentIntent.id,
                    date: new Date(), // utc date convert. use moment js to
                    cartIds: cart.map(item => item._id),
                    orderItemIds: cart.map(item => item.cartId),
                    status: 'pending'
                }

                const res = await axiosSecure.post('/payments', payment);
                refetch();
                console.log('payments save', res.data)
                if(res.data.payemntResult.insertedId){ 
                    toast.success('Payments Complete Successfully')
                    navigate('/dashboard/paymentsHistory')

                }

            }

        }

    }




    return (
        <div className='m-20'>
            <form className='max-w-xl' onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button
                    className='btn btn-sm btn-primary my-5'
                    type="submit"
                    disabled={!stripe || !clientSecret}>
                    Pay
                </button>
                <p className='text-red-600'>{error}</p>
                {trantionId && <p className='text-green-500'>
                    Successfully Done Payments. Your Transtion Id: {trantionId}</p>}
            </form>

                    <ToastContainer></ToastContainer>
        </div>
    );
};

export default CheckoutForm;