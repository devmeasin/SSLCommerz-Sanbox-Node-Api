console.clear();
const express = require('express')
const bodyParser = require('body-parser');
const SSLCommerzPayment = require('sslcommerz');
const { BASE_URL, StoreID, StorePass } =  require('./config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : false}))

app.get('/' , (req, res) => {
    res.send("<h3>Payment Success!</h3>")
})




app.get('/payment', (req, res) => {
    const data = {
        total_amount: 100,
        currency: 'BDT',
        tran_id: 'REF123',
        success_url: `${BASE_URL}/success`,
        fail_url: `${BASE_URL}/fail`,
        cancel_url: `${BASE_URL}/cancel`,
        ipn_url: `${BASE_URL}/ipn`,
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'cust@yahoo.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
        multi_card_name: 'mastercard',
        value_a: 'ref001_A',
        value_b: 'ref002_B',
        value_c: 'ref003_C',
        value_d: 'ref004_D'
    };

    let SslCommerzPaymentX = SSLCommerzPayment.SslCommerzPayment

    const sslcommer = new SslCommerzPaymentX('testbox', 'qwerty',false) //true for live default false for sandbox
    sslcommer.init(data).then(data => {
        console.log(data)
        if(data?.GatewayPageURL) {
            return res.status(200).redirect(data?.GatewayPageURL)
        } else {
            return res.status(401).json({ message: 'Payment Failed!'})
        }
    });
})

app.post('/success', async (req, res) => {
       return res.status(200).json({
            data : req.body
       })
})

app.post('/fail', async (req, res) => {
    return res.status(200).json({
         data : req.body
    })
})

app.post('/cancel', async (req, res) => {
    return res.status(200).json({
         data : req.body
    })
})


app.post('/ipn', async (req, res) => {
    return res.status(200).json({
         data : req.body
    })
})




app.listen(8080 , () => console.log(`listening on ${8080}`));