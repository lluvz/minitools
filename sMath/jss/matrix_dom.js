class MatrixDom{
    constructor(){
        this.Matrix=new Matrix();
        this.wholeStyle=`
        margin:3px;
        border-style:solid;
        border-color:lightsteelblue;
        width: 600px;
        display:inline-block`
    }
    createDiv(w,h){
        let div=document.createElement('div');
        let ddiv;
        let input;
        for(let j=0;j<h;j++){
            ddiv=document.createElement('div')
            for(let i=0;i<w;i++){
                input=document.createElement('input');
                input.type='Number'
                ddiv.appendChild(input);
            }
            div.appendChild(ddiv);
        }
        return div;
    }
    showMatrix(M,div){
        let h=div.children.length;
        let w=div.children[0].children.length;
        if(w*h!=M.length){
            console.error('The dimensions of the div and the matrix do not match')
        }
        for(let j=0;j<h;j++){
            for(let i=0;i<w;i++){
                div.children[j].children[i].value=M[j*w+i];
            }
        }
    }
    getMatrix(div){
        let h=div.children.length;
        let w=div.children[0].children.length;
        let M=new Array(h*w);
        for(let j=0;j<h;j++){
            for(let i=0;i<w;i++){
                M[j*w+i]=Number(div.children[j].children[i].value);
            }
        }
        return M;
    }
    createDivWithText(w,h,text){
        let result=document.createElement('details');
        let summary=document.createElement('summary');
        summary.innerHTML=text;
        let div=this.createDiv(w,h);
        result.appendChild(summary);
        result.appendChild(div);
        result.open=true;
        return result;
    }
    createComplete(w,h,name='Matrix Name'){
        let result={};
        let whole=document.createElement('div');
        whole.style=this.wholeStyle;
        result.name=document.createElement('span');
        result.name.innerHTML=name;
        result.original=this.createDivWithText(w,h,'Original');
        result.det=document.createElement('span');
        result.det.innerHTML='Deteminant: ';
        result.rank=document.createElement('span');
        result.rank.innerHTML='Rank: ';
        result.stair=this.createDivWithText(w,h,'Stair');
        result.simple=this.createDivWithText(w,h,'Simple');
        result.inverse=this.createDivWithText(w,h,'Inverse');
        for(let i in result){
            whole.appendChild(result[i]);
        }
        result.w=w;
        result.h=h;
        result.whole=whole;
        return result;
    }
    reactComplete(complete){
        let isAllNum=true;
        for(let i=0;i<complete.w;i++){
            for(let j=0;j<complete.h;j++){
                if(complete.original.children[1].children[j].children[i].value==''){
                    isAllNum=false;
                    break;
                }
            }
        }
        if(isAllNum){
            m=this.getMatrix(complete.original.children[1]);
            let mS1=this.Matrix.s1(m,complete.w);
            let mS2=this.Matrix.s2(mS1,complete.w);
            let mInverse=this.Matrix.inverse(m,complete.w);
            this.showMatrix(mS1,complete.stair.children[1]);
            this.showMatrix(mS2,complete.simple.children[1]);
            this.showMatrix(mInverse,complete.inverse.children[1]);
            
            complete.rank.innerHTML='Rank: '+this.Matrix.ranks1(mS1,complete.w)+"&nbsp;&nbsp;";
            complete.det.innerHTML='Det: '+this.Matrix.det(m,complete.w);
        }
    }
}