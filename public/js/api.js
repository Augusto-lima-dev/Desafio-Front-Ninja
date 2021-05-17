
async function getApi() {       //CONSUMINDO API 
    try {
        const response = await fetch('http://localhost:3333/api')
        const data = await response.json()
        anData(data)
    } catch (error) {
        console.log(error)
    }
}


function anData(data) {     //ANÁLISA O DADO
    var i = 0
    for (item of data._embedded.request_fields) {   //NAVEGANDO NA PRIMEIRA PARTE DO JSON
        var key = Object.keys(item),
            value = Object.values(item) //OBTENDO AS LISTAS DE JEY E VALOR
        createContainer("field-form")       //CRIANDO ELEMENTOS HTML
        setContainer(key, value, i);
        i++
    }
    formUserFields(data, count);
}


function setContainer(key, value, i) {
    var doc = document.getElementsByClassName("field-form")
    for (count = 0; count < key.length; count++) {  //CRIANDO PARÂMETRO PARA ACESSAR OS ÍNDICES DO ARRAY
        if(key[count] == "required" && value[count] == true){
            var require = "required"
            doc[i].setAttribute("required","true")
        }else if (key[count] == "required" && value[count] == false){
            doc[i].setAttribute("required","false")
        }else if (key[count] == "label" && value[count]) {
            doc[i].innerHTML = value[count] //ESCREVEBDO A PERGUNTA NO HTML
        }else if(key[count] == "type" && value[count] == "enumerable") {
            var enume = true
        }else if(key[count] == "type" && value[count] == "big_text"){
            var cria = createInput("big_txt", doc[i])   // criando big text
            cria.setAttribute("type","big_text")
        }else if(key[count] == "placeholder" && value[count] == "Descreva o que você precisa"){
            var place_bigtxt = doc[i].getElementsByClassName("big_txt")  //especificando big text
            place_bigtxt[0].setAttribute("placeholder",value[count])   
        }else if (value[count] == "Qual será o serviço?") {
            var first = document.getElementsByClassName("field-form")[0]
            first.setAttribute("style", "display: block;")
        } else if (key[count] == "values") {   //SE FOR TRUE, IRÁ NAVEGAR NO ARRAY
            fazList(value, i, doc, enume, require)
        } else {
            doc[i].setAttribute(key[count], value[count])
        }
    }
}

 

        // Faz a lista de serviços/opções
function fazList(value, i, doc, enume, require){
        let contadorId = 1
        if (enume) {                                        //verifica se vai precisar checar-form
        var container_sel = document.createElement("div")
        doc[i].appendChild(container_sel)
        container_sel.setAttribute("class","container_select")
        var selec = document.createElement("select")
        container_sel.appendChild(selec)                                    //cria os selects com as opções
        var opt = document.createElement("option")                              //trabalha no dom 
        opt.innerHTML = "Selecione uma opção"
        opt.setAttribute("disabled",true)        
        opt.setAttribute("selected","selected") 
        selec.appendChild(opt)
        if (require == "required"){
            var txt_alert = document.createElement("p")
            txt_alert.setAttribute("class","txt_alert")
            txt_alert.setAttribute("style","display:none;")                
            txt_alert.setAttribute("id",`txt_alert_${i}`)
            txt_alert.innerHTML = "Este campo é requerido"
            doc[i].appendChild(txt_alert)
        }}
        
        for (servico in value[count]) { //INICIANDO A NAVEGAÇÃO      //DEIXAR ESSA LINHA ------------------
            if (enume){                                 
                var opt = document.createElement("option")  
                selec.appendChild(opt)                  
                opt.setAttribute("value", servico)      
                opt.innerHTML = servico                  
            }
        }
} 
    
    
   


function formUserFields(data) {
    createContainer("form_info_users")
    var list_info = document.getElementsByClassName("form_info_users")
    for (item of data._embedded.user_fields) {   //NAVEGANDO NA SEGUNDA PARTE DO JSON 
        var txtlbl = document.createElement("label")
        txtlbl.setAttribute("class","txtlabel")
        var list_item = document.createElement("li")
        list_info[list_info.length-1].setAttribute("type","")
        list_item.setAttribute("class","lista_itens")
        list_info[0].appendChild(list_item)  
        var in_user = document.createElement("input") 
        list_item.appendChild(txtlbl) 
        in_user.setAttribute("class","in_user")              
        list_item.appendChild(in_user) 
        for (var i = 0; i < Object.keys(item).length; i++){   
            var key = Object.keys(item)[i],
                value = Object.values(item)[i]
            if (key == "required" && value == true){
                var msg_invalid = document.createElement("p")
                msg_invalid.innerHTML = "Este campo é requerido"
                msg_invalid.setAttribute("class","msg_inv_dado_usu")
                msg_invalid.setAttribute("style","display: none;")
                in_user.setAttribute("required","true")
                list_item.appendChild(msg_invalid)   
            }else if (value == "Celular") {
                in_user.placeholder = "(00) 00000-0000"
                txtlbl.innerHTML= value 
            }else if (value == "CEP") {
                in_user.placeholder = "00000-000"
                txtlbl.innerHTML= value 
            }else if (key == "placeholder" && value != "") {
                in_user.setAttribute("placeholder", value)
            }else if(key != "placeholder") {
                in_user.setAttribute(key,value) 
                if (key == "label"){    
                    txtlbl.innerHTML = value
                }else if (value == "Celular") {
                    in_user.placeholder = "(00) 00000-0000"
                }else if (value == "CEP") {
                    in_user.placeholder = "00000-000"
                }

            }                      
        }                
}}





function createContainer(classname) {
    const doc = document.getElementsByClassName("questionario")
    var field = document.createElement("ul")
    field.setAttribute("class", classname)
    field.setAttribute("style", "display:none")
    doc[0].appendChild(field)

}


function createInput(class_nome, local){
    var info_in = document.createElement("input")
    var li_list = document.createElement("li")
    local.appendChild(li_list)
    info_in.setAttribute("class", class_nome)
    li_list.appendChild(info_in)
    return info_in
}