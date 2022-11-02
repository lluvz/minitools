class SymbolMath{
    constructor(){
        class Polynomial{
            constructor(children=[]){
                this.children=children;
            }
            add(a,place=this.children.length){
                if(a.constructor.name=="Polynomial"){
                    let ap=this.children.slice(0,place);
                    let an=this.children.slice(place,this.children.length);
                    this.children=ap.concat(a.children).concat(an);
                }
                else{
                    this.children.splice(place,0,a);
                }
            }
            multiply(m){
                return (new Single([this,m]));
            }
            power(e){
                return (new Single([this],e));
            }
            merge(p1,p2){
                if(p1==null){
                    
                }
                else{
                    
                }
            }
            extract(){
            }
            factorize(){
            }
            unfold(){
            }
            mergable(i1,i2){
                return (a.constructor.name==b.constuctor.name) && 
                    ((a.constructor.name=='Single'))
            }
            proportionalTo(p){}
        }
        class Single{
            constructor(children=[],exponent=1,sign=1){
                this.children=children;
                this.exponent=exponent;
                this.sign=sign;
            }
            multiply(a){
                this.children.push(a);
            }
            merge(){
                for(let i=0;i<this.children.length;i++){
                    if(this.children[i]){}
                }
            }
        }
        this.Polynomial=Polynomial;
        this.Single=Single;
    }
}
