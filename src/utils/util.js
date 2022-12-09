import { Message } from 'element-ui'
export const getPenAuthInfoParmas = (pen) => {
    if(pen.communication){
        if(pen.communication.authentication){
            const {method,parmas,url} = pen.communication.authentication
            let obj = {
                method,
                url
            }
            if(method=='post'){
                let data = {}
                let headers = {}
                for(let datax of parmas){
                    if(datax.type==1){
                        data[datax.name] = datax.value
                    }
                    if(datax.type==2){
                        headers[datax.name] = datax.value
                    }
                }
                obj = {...obj,data,headers}
            }
            if(method=='get'){
                let params = {}
                let headers = {}
                for(let datax of parmas){
                    if(datax.type==1){
                        params[datax.name] = datax.value
                    }
                    if(datax.type==2){
                        headers[datax.name] = datax.value
                    }
                }
                obj = {...obj,params,headers}
            }
            return obj
        }
    }
    return {}
  }
  export const getParmas = (objx,info,exparams,ind) => {

        console.log(objx,info,exparams,ind,'==exparams==')
            const {method,parmas,url} = objx
            let obj = {
                method,
                url
            }
            if(method=='post'){
                let data = {...exparams}
                let headers = {}
                for(let datax of parmas.extraParmas){
                    if(datax.type==1){
                        data[datax.name] = datax.value
                    }
                    if(datax.type==2){
                        var regex3 = /\{(.+?)\}/g;  
                        let arr = datax.value.match(regex3)
                        let value 
                        arr.map((el)=>{
                            value = datax.value .replace(el,info.communication.authentication.token)
                        })
                        if(arr.length){
                            headers[datax.name] = value
                        }else{
                            headers[datax.name] = datax.value
                        }
                    }
                }
                if(objx.pramasType=='pramas'){
                    let string = '?'
                    for(let s in data){
                        string = string + s+'='+data[s]+'&'
                    }
                    let data2 = {}
                    if(objx.field.lastRelationField && ind>0){
                        data2[objx.field.searchRelationField] = info.communication.Interface.InterfaceList[ind-1][objx.field.lastRelationField]
                    }
                    obj.url = obj.url+string
                    obj = {...obj,data:data2,headers}
                }
                if(objx.pramasType=='data'){
                    if(objx.field.lastRelationField && ind>0){
                        data[objx.field.searchRelationField] = info.communication.Interface.InterfaceList[ind-1][objx.field.lastRelationField]
                    }
                    obj = {...obj,data,headers}
                }
                
            }
            if(method=='get'){
                let params = {...exparams}
                console.log(params,'==params==')
                let headers = {}
                if(objx.parmas.extraParmas){
                    for(let datax of objx.parmas.extraParmas){
                        if(datax.type==""){
                            Message({
                                message: "接口的附加参数为选择参数类型",
                                    type: 'error'
                            });
                        }
                        if(datax.type==1){
                            params[datax.name] = datax.value
                        }
                        if(datax.type==2){
                            var regex3 = /\{(.+?)\}/g;  
                            let arr = datax.value.match(regex3)
                            let value 
                            arr.map((el)=>{
                                value = datax.value .replace(el,info.communication.authentication.token)
                            })
                            if(arr.length){
                                headers[datax.name] = value
                            }else{
                                headers[datax.name] = datax.value
                            }
                            
                        }
                    }
                }
                if(objx.field.lastRelationField && ind>0){
                    params[objx.field.searchRelationField] = info.communication.Interface.InterfaceList[ind-1][objx.field.lastRelationField]
                }
                obj = {...obj,params,headers}
            }
            return obj
  }