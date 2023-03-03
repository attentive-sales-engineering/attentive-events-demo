$(document).ready(function () {
  // Page loaded - get localstorage items
  console.log('PAGE LOADED -> ', window.location.pathname)

  let firstName = localStorage.getItem('firstName') || 'Sally'
  // console.log('get firstName:', firstName)
  const firstNameElement = document.querySelector('#firstName')

  let lastName = localStorage.getItem('lastName') || 'Smith'
  // console.log('get lastName:', lastName)
  const lastNameElement = document.querySelector('#lastName')

  let email = localStorage.getItem('email') || 'ssmithtest@attentive.com'
  // console.log('get email:', email)
  const emailElement = document.querySelector('#email')

  let phone = localStorage.getItem('phone') || '+12065551212'
  // console.log('get phone:', phone)
  const phoneElement = document.querySelector('#phone')

  // Event listener to process messages from sign-up unit via postMessage()
  window.addEventListener('message', e => {
    console.log(e)
    // EMAIL
    if (e.data.__attentive.email) {
      console.log('e.data.__attentive.email: ' + e.data.__attentive.email)
      email = e.data.__attentive.email
      localStorage.setItem('email', email)
    }
    // PHONE
    if (e.data.__attentive.phone) {
      console.log('e.data.__attentive.phone: ' + e.data.__attentive.phone)
      phone = e.data.__attentive.phone
      localStorage.setItem('phone', phone)
    }
    // METADATA
    if (e.data.__attentive.metadata) {
      console.log(
        'e.data.__attentive.metadata: ' +
          JSON.stringify(e.data.__attentive.metadata, null, 2)
      )
      // FIRST NAME
      if (e.data.__attentive.metadata['First Name']) {
        console.log(
          'e.data.__attentive.metadata["First Name"]: ' +
            e.data.__attentive.metadata['First Name']
        )
        firstName = e.data.__attentive.metadata['First Name']
        localStorage.setItem('firstName', firstName)
      }
      // LAST NAME
      if (e.data.__attentive.metadata['Last Name']) {
        console.log(
          'e.data.__attentive.metadata["Last Name"]: ' +
            e.data.__attentive.metadata['Last Name']
        )
        lastName = e.data.__attentive.metadata['Last Name']
        localStorage.setItem('lastName', lastName)
      }
    }
    // console.log('e.data: ' + JSON.stringify(e.data, null, 2))
  })

  if (window.location.pathname.match('order-details')) {
    console.log('ORDER DETAILS PAGE -> PRODUCT VIEW SDK')
    window.attentive.analytics.productView({
      items: [
        {
          productId: 'sports-tix-2',
          productVariantId: 'sports-tix-2b',
          name: 'SPORTS-NY-MIA-GAME-1',
          price: {
            value: '550',
            currency: 'USD'
          }
        }
      ],
      user: {
        phone: phone
      }
    })
  }

  if (window.location.pathname.match('booking')) {
    console.log('BOOKING PAGE -> GET LOCAL STORAGE & SET FORM VALUES')
    if (firstNameElement) firstNameElement.value = firstName
    if (lastNameElement) lastNameElement.value = lastName
    if (emailElement) emailElement.value = email
    if (phoneElement) phoneElement.value = phone
    if (cityElement) cityElement.value = city
    if (checkInElement) checkInElement.value = checkIn
    if (checkOutElement) checkOutElement.value = checkOut
    if (adultsElement) adultsElement.value = adults
    if (childrenElement) childrenElement.value = children
  }

  // Clicked primary link button
  $('.primary-link').click(function () {
    console.log('CLICKED SUBMIT')
    if (window.location.pathname.match('order-review')) {
      console.log('SET LOCAL STORAGE')
      localStorage.setItem('city', cityElement.value)
      localStorage.setItem('checkIn', checkInElement.value)
      localStorage.setItem('checkOut', checkOutElement.value)
      localStorage.setItem('adults', adultsElement.value)
      localStorage.setItem('children', childrenElement.value)
      // ADD TO CART SDK
      console.log('PLACE ORDER BUTTON -> ADD TO CART SDK')
      window.attentive.analytics.addToCart({
        items: [
          {
            productId: 'sports-tix-2',
            productVariantId: 'sports-tix-2b',
            name: 'SPORTS-NY-MIA-GAME-1',
            price: {
              value: '550',
              currency: 'USD'
            }
          }
        ],
        user: {
          phone: phone
        }
      })
    } else if (window.location.pathname.match('payment-method')) {
      // PURCHASE SDK
      console.log('CONFIRM PAYMENT BUTTON -> PURCHASE SDK')
      window.attentive.analytics.purchase({
        items: [
          {
            productId: 'sports-tix-2',
            productVariantId: 'sports-tix-2b',
            name: 'SPORTS-NY-MIA-GAME-1',
            price: {
              value: '550',
              currency: 'USD'
            }
          }
        ],
        order: {
          orderId: 'order-1'
        },
        user: {
          phone: phone
        }
      })
    }
  })
})
