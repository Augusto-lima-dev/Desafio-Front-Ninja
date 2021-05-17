const etapas = document.getElementsByTagName("ul");
const header = document.getElementsByClassName("head_first");
const container = document.getElementsByClassName("btn");
const row_etapas = document.getElementsByClassName("etapas") 
const form_card = document.getElementsByClassName("questionario")
const field_check = document.getElementsByClassName("field-form")





function proximo(){
var count = 0
for (item of etapas){
    if (count != etapas.length){
        if (item.style.display == "block"){
            if (checkRequire(count) == "required"){
                break
            }else if (count != etapas.length-1) {   //validando se é o ultimo element
                if (count == 0){
                    trocaButton("second") 
                }else if(count == etapas.length-2){
                    trocaHead("second")                    
                }
                var up = etapas[count+1] 
                up.setAttribute("style","display:block;")
                line_etapas(count)
                etapas[count].style.display = "none"
                break
            }else{ 
                break //chamar função submit ----- ultimo click do form
            }
        }else{
            count+=1
        }
    }
}}



function retorna(){
    var count = 0
    for (item of etapas){
        if (count != etapas.length){
            if (item.style.display == "block"){
                if (count != 0) {  //validando se tem índice para retornar "0"
                    if (count == 1){
                     trocaButton("primeiro")   
                    }else if(count==etapas.length-1){
                        trocaHead("first")
                    }
                    var down = etapas[count-1]     
                    down.setAttribute("style","display:block;")
                    line_etapas(count-2)
                    etapas[count].style.display = "none"
                    break
                }else{
                    break  //se o indice for 0 ele não faz nada 
                }
            }else{
                count+=1  //variavel de controle para navegação dos itens da ul
                }
        }
    }
}



function checkRequire(direct) {
            // for na primeira parte do form/JSON
if (direct != field_check.length){
    var container_div = etapas[direct].children[0]
    if (etapas[direct].getAttribute("required") === "true"){
        if(container_div.children[0].value == "Selecione uma opção"){ 
            etapas[direct].getElementsByClassName("txt_alert")[0].style.display = "block"
            return("required")
        }else {
            if (etapas[direct].getElementsByClassName("txt_alert")[0].style.display == "block"){
                etapas[direct].getElementsByClassName("txt_alert")[0].style.display = "none"  //MSG QUE RETORNA QUANDO NÃO ESCREVEM NADA
            }}
    }else{
        return ("togo")
    }}
    else {         //LOGICA DE CHECKFORM DOS DADOS DO USARIO  JSON PT2
        var msg_inv_check = document.getElementsByClassName("msg_inv_dado_usu") // 
        var check_info_usu = document.getElementsByClassName("in_user")
        console.log(check_info_usu[contadora])
        for (var contadora = 0; contadora< check_info_usu.length; contadora++){
            if(check_info_usu[contadora].getAttribute("required") == "true"){
                if(check_info_usu[contadora].value == 0){
                    msg_inv_check[contadora].setAttribute("style", "display: block")
                }else {
                    msg_inv_check[contadora].setAttribute("style", "display: none")
                }
            } 
        }
    } 
}

 






function headFirst(){
    var tit = document.createElement("h3")
    var sub_tit = document.createElement("h4")
    header[0].appendChild(tit)
    tit.setAttribute("class", "first")
    tit.setAttribute("style", "display: block")
    tit.innerHTML = "Explique o que você precisa"
    sub_tit.innerHTML = "Receba até 4 orçamentos grátis, online!"
    tit.appendChild(sub_tit)
    firstButton()
    criaRodaPe()
    secondButton()
    headSecond()
}


function headSecond(){
    var container = document.createElement("div")
    container.setAttribute("style","display: none;")
    container.setAttribute("class","container_header")
    header[0].appendChild(container)
    var img = document.createElement("img")     //criando os elementos no html no head
    var tit = document.createElement("h2")
    var paragrafo = document.createElement("p")
    container.appendChild(img)
    img.setAttribute("src","https://tanya-assets.getninjas.com.br/static/images/svg/fast-clock.svg")  
    container.appendChild(tit)
    tit.innerHTML = "Estamos quase lá"
    tit.appendChild(paragrafo)
    paragrafo.innerHTML = `Não perca tempo ligando para vários profissionais. Preencha os dados abaixo e <strong> nós encontraremos os melhores pra você! </strong>` 
    img.setAttribute("style","display:relative")
    paragrafo.setAttribute("class","para_head")
    tit.setAttribute("class","tit_head")
    img.setAttribute("class","img_head")
}


function trocaHead(show){
    var header = document.getElementsByClassName("first")
    var container = document.getElementsByClassName("container_header")
    if(show == "second"){
        header[0].setAttribute("style","display: none;")
        container[0].setAttribute("style","display: block")    
    }else {
        container[0].setAttribute("style","display: none")
        header[0].setAttribute("style","display: block;")
    }}


function firstButton(){
    var botao_unico = document.createElement("button")
    botao_unico.setAttribute("id","botao_unico")
    botao_unico.setAttribute("type","button")
    botao_unico.setAttribute("onclick","proximo()")
    botao_unico.innerHTML = "Próximo"
    container[0].appendChild(botao_unico)
}

function secondButton(){
    conj = document.createElement("div")
    conj.setAttribute("style","display: none;")
    ant_page = document.createElement("button")
    conj.appendChild(ant_page)
    prox_page = document.createElement("button")
    conj.appendChild(prox_page)
    container[0].appendChild(conj)
    conj.setAttribute("class","conj_botoes")
    prox_page.setAttribute("id","btn_prox")
    ant_page.setAttribute("id","btn_ant")
    prox_page.setAttribute("type","button")
    ant_page.setAttribute("onclick","retorna()")
    prox_page.setAttribute("onclick","proximo()")
    ant_page.setAttribute("type","button")
    ant_page.innerHTML = "Voltar"
    prox_page.innerHTML = "Próximo"
}


function trocaButton(show){
    var primeiro = document.getElementById("botao_unico")
    var conj = document.getElementsByClassName("conj_botoes")
    if(show == "primeiro"){
        conj[0].setAttribute("style","display: none;")
        primeiro.setAttribute("style","display: block;")
    }else{
        primeiro.setAttribute("style", "display: none;")
        conj[0].setAttribute("style","display: block;")
    }
}


function criaRodaPe(){
    var img_text = document.createElement("div")
    img_text.setAttribute("class","fdbk_msg")
    var container_rodape = document.getElementsByClassName("roda_pe");
    container_rodape[0].appendChild(img_text)
    var img = document.createElement("img")
    img_text.appendChild(img)
    var text = document.createElement("p")
    img_text.appendChild(text)
    text.setAttribute("id","txt_fdbk")
    img.setAttribute("id","deadline")
    img.setAttribute("src","https://img.icons8.com/ios-filled/50/4a90e2/wall-clock.png")
    text.innerHTML = "Orçamentos em até 60 minutos"
}


function line_etapas(atual) {
    atual += 1
    row_etapas[0].style.width = `${(100 * atual )/etapas.length }%`
}


