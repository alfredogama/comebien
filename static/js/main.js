import CartNumber from './cart-number-plugin.js';

document.addEventListener('DOMContentLoaded', function() {
    const cartNumber = new CartNumber({
        container: document.querySelector('#number-badge'),
        initCounter: 0
    });

    /*const buttonsAddCart = document.querySelectorAll('.button-add-cart');
    for (const button of buttonsAddCart) {
        button.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            const modalAddCart = M.Modal.getInstance(document.querySelector('#modal-add-cart'));
            if (modalAddCart) {
                cartNumber.addNumber(1);
                modalAddCart.open();
            }
        };
    }*/

    M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'), {
        alignment: 'left',
        coverTrigger: false
    });
    for (const obj of document.querySelectorAll('.custom-dropdown')) {
        for (const a of obj.querySelectorAll('a')) {
            a.innerHTML = '<span class="badge material-icons">keyboard_arrow_right</span>' + a.innerHTML;
        }
    }

    if (document.querySelector('.glide')) {
        var glide = new Glide('.glide', {
            type: 'carousel',
            startAt: 0,
            perView: 1,
            gap: 0
        });
    
        glide.mount();
    }

    if (document.querySelector('.custom-slider')) {
        var custom_slider = tns({
            container: '.custom-slider',
            items: 4,
            slideBy: 'page',
            autoplay: false,
            nav: false,
            controlsText: ['<img src="/static/images/arrow_left_gray.svg">', '<img src="/static/images/arrow_right_gray.svg">'],
            responsive: {
                300: {
                    items: 1
                },
                640: {
                    items: 2
                },
                1100: {
                    items: 3
                },
                1200: {
                    items: 4
                },
            }
        });
    }

    var menus = M.Sidenav.init(document.querySelectorAll('.sidenav'), {});
    var collapsibles = M.Collapsible.init(document.querySelectorAll('.collapsible'), {});

    M.FormSelect.init(document.querySelectorAll('.custom-select'));

    const selects = document.querySelectorAll('.select-wrapper')
    for (const obj of selects) {
        obj.onclick = () => {
            for (const obj of selects) {
                obj.classList.remove('active');
            }
            obj.classList.add('active');
        };
    }

    if (document.querySelector('.similar-slider-custom')) {
        var similar_slider = tns({
            container: '.similar-slider-custom',
            items: 4,
            slideBy: 'page',
            autoplay: false,
            nav: false,
            edgePadding: 25,
            controlsText: ['<img class="arrow_left" src="/static/images/arrow_left_white.svg">', '<img class="arrow_right" src="/static/images/arrow_right_white.svg">'],
            responsive: {
                300: {
                    items: 1
                },
                640: {
                    items: 2
                },
                1100: {
                    items: 3
                },
                1200: {
                    items: 4
                },
            }
        });
    }

    if (document.querySelectorAll('.modal')) {
        M.Modal.init(document.querySelectorAll('.modal'), {});
    }

    const buttons = document.querySelectorAll('.buttonAddToCart');
    for (const obj of buttons) {
        obj.onclick = (e) => {
            e.stopPropagation();
            e.preventDefault();

            updateCart(e.target,1,true);
        };
    }

    const compareBackButton = document.querySelector('.compare-title .back');
    if (compareBackButton) {
        compareBackButton.onclick = (e) => {
            e.preventDefault();
            window.history.back();
        };
    }




    /** buttons detail product + - */
    const minusButton = document.querySelector('.quentity-minus');
    const plusButton = document.querySelector('.quentity-plus');
    let quantityNumberValue;
    if (checkIfExistsElementInHtml(document.querySelector('.quantity-product'))){
        quantityNumberValue = Number(document.querySelector('.quantity-product').innerHTML);
    }
    const quantityNumber = document.querySelector('.quantity-product');
    if (minusButton) {
        minusButton.onclick = (e) => {
            if (quantityNumberValue <= 1) {
                return;
            } else {
                quantityNumberValue = quantityNumberValue - 1;
                quantityNumber.innerHTML = quantityNumberValue;
            }
        };
    }
    if (plusButton) {
        plusButton.onclick = (e) => {
            quantityNumberValue = quantityNumberValue + 1;
            quantityNumber.innerHTML = quantityNumberValue;
        };
    }

    /** cart quantity */

    const cartQs = document.querySelectorAll('.cart-quantity');
    for (const obj of cartQs) {
        const cartQPlus = obj.querySelector('.cart-quantity-plus');
        const cartQMinus = obj.querySelector('.cart-quantity-minus');
        const cartQNumber = obj.querySelector('.cart-quantity-product');
        cartQPlus.onclick = async (e) => {
            e.preventDefault();

            await updateCart(e.target);
            let number = Number(cartQNumber.innerHTML);
            number = number + 1;
            cartQNumber.innerHTML = number;
            const price = Number(obj.getAttribute('data-price'));
            obj.parentElement.parentElement.querySelector('.subtotal span').innerHTML = (price * number).toFixed(2)
        };
        cartQMinus.onclick = async (e) => {
            e.preventDefault();
            let number = Number(cartQNumber.innerHTML);
            number = number - 1;
            if (number <= 0) {
                return;
            }

            await updateCart(e.target);
            cartQNumber.innerHTML = number;
            const price = Number(obj.getAttribute('data-price'));
            obj.parentElement.parentElement.querySelector('.subtotal span').innerHTML = (price * number).toFixed(2)
        };
    }

    const processCartButton = document.querySelector('#process-cart');
    if (processCartButton) {
        processCartButton.onclick = (e) => {
            e.preventDefault();
            const instance = M.Modal.getInstance(document.querySelector('#modal-login2'));
            if (instance) {
                instance.open();
            }
        };
    }

    var options_checks = document.querySelectorAll('.ship-check-cont .options-check');
    for (const obj of options_checks) {
        obj.onclick = () => {
            console.log(obj.value);
            for (const obj of options_checks) {
                obj.checked = false;
                obj.parentElement.parentElement.classList.remove('active');
                document.querySelector('.cart-dispatch-page .address').classList.remove('show');
                document.querySelector('.cart-dispatch-page .ship-form').style.display = 'none';
            }
            obj.checked = true;
            obj.parentElement.parentElement.classList.add('active');
            if (obj.value === 'form') {
                document.querySelector('.cart-dispatch-page .ship-form').style.display = 'block';
            }
            if (obj.value === 'address') {
                const address = document.querySelector('.cart-dispatch-page .address');
                if (address) {
                    address.classList.add('show');
                }
                document.querySelector('.shiping-price').innerHTML = gettext('Por calcular');
            }
        };
    }

    var facturation_checks = document.querySelectorAll('.facturation-check');
    for (const obj of facturation_checks) {
        obj.onclick = () => {
            if (obj.checked) {
                obj.parentElement.parentElement.classList.add('active');
                document.querySelector('.cart-dispatch-page .factura-form').style.display = 'block';
                document.querySelector('.cart-dispatch-page .boleta-form').style.display = 'none';
            } else {
                obj.parentElement.parentElement.classList.remove('active');
                document.querySelector('.cart-dispatch-page .factura-form').style.display = 'none';
                document.querySelector('.cart-dispatch-page .boleta-form').style.display = 'block';
            }
        };
    }

    const inputNumbers = document.querySelectorAll('input[data-type="number"]');
    for (const obj of inputNumbers) {
        obj.onkeydown =  function(e) {
            var charValue= String.fromCharCode(e.keyCode);
            if((isNaN(charValue)) && (e.which != 8 )) {
                e.preventDefault();
            }
            return true;
        };
    }

    /*const selects = document.querySelectorAll('.select-wrapper')
    for (const obj of selects) {
        obj.onclick = () => {
            for (const obj of selects) {
                obj.parentElement.classList.remove('active');
            }
            obj.parentElement.classList.add('active');
        };
    }*/
});
