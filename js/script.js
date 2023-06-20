let modalQT = 1;

const c = (el)=>document.querySelector(el);
const cs = (el)=>document.querySelectorAll(el);

//listagem dos modelos
modeloJson.map((item, index)=>{
    let modeloItem = c('.models .modelo-item').cloneNode(true);

    modeloItem.setAttribute('data-key', index);

    modeloItem.querySelector('.modelo-item-img img').src = item.img;
    modeloItem.querySelector('.modelo-item-name').innerHTML = item.name;
    modeloItem.querySelector('.modelo-item-desc').innerHTML = item.description;
    modeloItem.querySelector('.modelo-item-price').innerHTML = `R$ ${item.price.toFixed(2)}`;

    modeloItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();

        let key = e.target.closest('.modelo-item').getAttribute('data-key');
        modalQT = 1;

        c('.modeloBig img').src = modeloJson[key].img;
        c('.modeloInfo h1').innerHTML = modeloJson[key].name;
        c('.modeloInfo .modeloInfo-desc').innerHTML = modeloJson[key].description;
        c('.modeloInfo .modeloInfo-actualPrice').innerHTML = `R$ ${modeloJson[key].price.toFixed(2)}`;
        c('.modeloInfo-size.selected').classList.remove('selected');

        cs('.modeloInfo-size').forEach((size, sizeIndex) => {
            if (sizeIndex == 0){
                size.classList.add('selected');
            }

            size.querySelector('span').innerHTML = modeloJson[key].sizes[sizeIndex];
        });

        c('.modeloInfo-qt').innerHTML = modalQT;
        c('.modeloWindowArea').style.opacity = 0;
        c('.modeloWindowArea').style.display = 'flex';

        setTimeout(() =>{
            c('.modeloWindowArea').style.opacity = 1;
        }, 50);
    });

    c('.modelo-area').append(modeloItem);
});

//eventos modal 
function closeModal(){
    c('.modeloWindowArea').style.opacity = 0;
    setTimeout(() =>{
        c('.modeloWindowArea').style.display = 'none';
    }, 50);
}

cs('.modeloInfo-cancelButton, .modeloInfo-cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal);
});

//botao qt menos
c('.modeloInfo-qtmenos').addEventListener('click', () =>{
    if (modalQT > 1){
        modalQT--;
        c('.modeloInfo-qt').innerHTML = modalQT;
    }
});

//botao qt mais
c('.modeloInfo-qtmais').addEventListener('click', () =>{
    modalQT++;
    //atualizo o valor no html
    c('.modeloInfo-qt').innerHTML = modalQT;
});

//tamanhos
cs('.modeloInfo-size').forEach((size, sizeIndex)=>{
    //ao clicar em um item
    size.addEventListener('click', () =>{
        //desmarca tudo
        c('.modeloInfo-size.selected').classList.remove('selected');
        //adiciono marcação
        size.classList.add('selected');
    });
});


