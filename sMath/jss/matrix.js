function s1(M0,w,h){
    let M=Array.from(M0);
    for(let j=0;j<h;j++){
        let k=j;
        while(k<h && M[k*w+j]==0){
            k++;
        }
        if(k==h){
            return j;
        }
        else{
            swap(M,w,j,k);
        }
        for(let i=w-1;i>j;i--){
            M[j*w+i]=M[j*w+i]/M[j*w+j];
        }
        M[j*w+j]=1;
        for(let k=j+1;k<h;k++){
            for(let l=w-1;l>=j;l--){
                M[k*w+l]-=M[j*w+l]*M[k*w+j];
            }
        }
    }
    return M;
}
function swap(M,w,line1,line2){
    let a;
    for(let i=0;i<w;i++){
        a=M[line1*w+i];
        M[line1*w+i]=M[line2*w+i];
        M[line2*w+i]=a;
    }
}
function s2s(M0,w,h){
    let M=Array.from(M0);
    for(let j=h-1;j>0;j--){
        M[j*w+w-1]=M[j*w+w-1]/M[j*w+j];
        M[j*w+j]=1;
        for(let k=0;k<j;k++){
            M[k*w+w-1]-=M[j*w+w-1]*M[k*w+j];
            M[k*w+j]=0;
        }
    }
    return M
}
function ss(M0,w){
    let h=M0.length/w;
    let M=Array.from(M0);
    return s2s(s1(M,w,h),w,h);
}
function s2(M0,w,h){
    let M=Array.from(M0);
    for(let j=h-1;j>0;j--){
        M[j*w+w-1]=M[j*w+w-1]/M[j*w+j];
        M[j*w+j]=1;
        for(let k=0;k<j;k++){
            for(let i=w-1;i>k;i--){
                M[k*w+i]-=M[j*w+i]*M[k*w+j];
            }
            M[k*w+j]=0;
        }
    }
    return M
}
function printM(M,w,h){
    let P=[];
    let p=[];
    for(let j=0;j<h;j++){
        p=[];
        for(let i=0;i<w;i++){
            p.push(M[i+j*w]);
        }
        P.push(p);
    }
    console.log(P)
}
function getChild(M,w,x,y){
    let h=M.length/w;
    let a=[];
    let b;
    for(let j=0;j<h;j++){
        if(j==y) continue;
        b=j*w;
        a=a.concat(M.slice(b,b+x)).concat(M.slice(b+x+1,b+w))
    }
    return a;
}
function getChild4del(M,w,x){
    let h=M.length/w;
    let a=[];
    let b;
    for(let j=1;j<h;j++){
        b=j*w;
        a=a.concat(M.slice(b,b+x)).concat(M.slice(b+x+1,b+w))
    }
    return a;
}
function del(M,w){
    if(w==1) return M[0];
    let result=0
    let s=1;
    for(let i=0;i<w;i++){
        result+=s*M[i]*del(getChild4del(M,w,i),w-1)
        s=-s;
    }
    return result;
}
function inverse(sequence){
    if(sequence.constructor.name=='String'){
        sequence=Array.from(sequence);
    }
    let result=0;
    for(let i=0;i<sequence.length;i++){
        for(let j=0;j<i;j++){
            if(sequence[j]>sequence[i]){
                result++;
            }
        }
    }
    return result;
}
function multiply(M1,w1,M2,w2){
    if(M2.length!=w1*w2){
        console.error('the width of M1 does not equal to that of M2');
    }
    let h1=M1.length/w1;
    let result=[];
    for(let j=0;j<h1;j++){
        for(let i=0;i<w2;i++){
            p=j*w2+i;
            result[p]=0;
            for(let ii=0;ii<w1;ii++){
                result[p]+=M1[ii+j*w1]*M2[i+ii*w2];
            }
        }
    }
    return result;
}
