new Vue({
    el:'#app',
    data:function(){
        return{
            listaPessoas: [],
            listaPessoasFiltrada:[],
            termoPesquisado:"",
            termoPesquisado2:"",
            termoPesquisado3:"",
            registrosEncontrados: false,
            registrosEncontrados2: false,
            registrosEncontrados3: false
        }
    },
    mounted:function(){
        this.pegarJson();
    },
    computed:{
        listaFiltradaPorDigitoSemIE: function() {

            var self =this;
            var palavraPesquisada = this.termoPesquisado2;
            this.registrosEncontrados = false;

            if(palavraPesquisada == ""){
                this.registrosEncontrados = false;
                return this.listaPessoas;
            }

            // --------------------> Busca por letra digitada com Object.values (NÃO COMPATIVEL COM IE)
            this.listaPessoasFiltrada = this.listaPessoas.filter(function(pessoa){

                var encontrados = Object.values(pessoa).find(function(valorPropriedade){
                    
                    var result= valorPropriedade.toString().toLowerCase().indexOf(palavraPesquisada.toLowerCase())
                
                    if(result!=-1){
                        return valorPropriedade;
                    }
                    
                });

                if(encontrados){
                    return pessoa;
                }
            
            })

            if(this.listaPessoasFiltrada.length == 0){
                this.registrosEncontrados = true;
            }

            return this.listaPessoasFiltrada;
        },
        listaFiltradaPorDigitoComIE: function(){

            var self =this;
            var palavraPesquisada = this.termoPesquisado3;
            this.registrosEncontrados2 = false;

            if(palavraPesquisada == ""){
                this.registrosEncontrados2 = false;
                return this.listaPessoas;
            }
            
            // --------------------> Busca por letra digitada com FOR (COMPATIVEL COM IE)
            this.listaPessoasFiltrada = this.listaPessoas.filter(function(pessoa){

                for(prop in pessoa){
                    
                    var result= pessoa[prop].toString().toLowerCase().indexOf(palavraPesquisada.toLowerCase())
                
                    if(result!=-1){
                        return pessoa;
                    }
                    
                }

            
            });

            if(this.listaPessoasFiltrada.length==0){
                
                this.registrosEncontrados2 = true;
            }

            return this.listaPessoasFiltrada;
        },
        listaFiltradaPorPalavraDigitadaComIE: function(){
            var self =this;
            var palavraPesquisada = this.termoPesquisado;
            this.registrosEncontrados3 = false;

            if(palavraPesquisada == ""){
                this.registrosEncontrados3 = false;
                return this.listaPessoas;
            }

            // --------------------> Busca por palavra digitada (NÃO COMPATIVEL COM IE)
            // this.listaPessoasFiltrada = this.listaPessoas.filter(pessoa => pessoa ? 
            // Object.values(pessoa).find(elemento =>elemento==palavraPesquisada) != undefined : "");

            // --------------------> Busca por palavra digitada (COMPATIVEL COM IE)
            this.listaPessoasFiltrada = this.listaPessoas.filter(function(pessoa){
                for(prop in pessoa){
                    if(pessoa[prop].toString().toLowerCase() == palavraPesquisada.toLowerCase()){
                        return pessoa;
                    }
                }
            });

            if(this.listaPessoasFiltrada.length == 0){
                this.registrosEncontrados3 = true;
            }

            return this.listaPessoasFiltrada;
        }
    },
    methods:{
        pegarJson: function(){
        
        var requisicao = new XMLHttpRequest;
        requisicao.open('GET','./mock/pessoas.json',false);
        requisicao.send();
        objPessoa = JSON.parse(requisicao.response);
        this.listaPessoas = objPessoa;
        
        },
        meuLinkedin: function(){
            window.open('https://www.linkedin.com/in/eduardo-marchiori-679965187/');
        }
    }
});
