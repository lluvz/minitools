class Matrix{
	constructor(){
	    class matrix{
            constructor(array,w){
                if(array.length%w){
                    console.error('The length of the array is not divisible by the input width!')
                    return
                }
                this.data=array
                this.w=w
                this.h=array.length/w
            }
        }
        this.mat=matrix
	}
	s1s(M0,w){
		let h=M0.length/w;
	    let M=Array.from(M0);
	    for(let j=0;j<h;j++){
	        let k=j;
	        while(k<h && M[k*w+j]==0){
	            k++;
	        }
	        if(k==h){
                console.warn('The rank of the matrix is small than its height, please use s1() instead of s1s() to deal with it.')
                return j
	        }
	        else{
	            this.swap(M,w,j,k);
	        }
	        for(let i=w-1;i>j;i--){
	            M[j*w+i]=M[j*w+i]/M[j*w+j];
	        }
	        M[j*w+j]=1;
	        for(let k=j+1;k<h;k++){
	            for(let l=w-1;l>j;l--){
	                M[k*w+l]-=M[j*w+l]*M[k*w+j];
	            }
                M[k*w+j]=0;
	        }
	    }
	    return M;
	}
	s1(M0,w){
		let h=M0.length/w;
	    let M=Array.from(M0);
        let jOffset
	    for(let j=0;j<h;j++){
	        let k=j;
	        while(k<h && M[k*w+j]==0){
	            k++;
	        }
            jOffset=j;
	        if(k==h){
                if(k==j+1){
                    break;
                }
                else{
                    jOffset++;
                }
	        }
	        else{
	            this.swap(M,w,j,k);
	        }
	        for(let i=w-1;i>jOffset;i--){
	            M[j*w+i]/=M[j*w+jOffset];
	        }
	        M[j*w+jOffset]=1;
	        for(let k=j+1;k<h;k++){
	            for(let l=w-1;l>=jOffset;l--){
	                M[k*w+l]-=M[j*w+l]*M[k*w+jOffset];
	            }
	        }
	    }
	    return M;
	}
    s2ss(M0,w){
		let h=M0.length/w;
	    let M=Array.from(M0);
	    for(let j=h-1;j>0;j--){
	        for(let k=0;k<j;k++){
	            M[k*w+w-1]-=M[j*w+w-1]*M[k*w+j];
	            M[k*w+j]=0;
	        }
	    }
	    return M
    }//For equations, and only suitable for main position is 1.
	s2s(M0,w){
		let h=M0.length/w;
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
	}//For equations, main position do not need to be 1.
	ss(M0,w){
	    let h=M0.length/w;
	    let M=Array.from(M0);
	    return this.s2ss(this.s1(M,w,h),w);
	}
	s2(M0,w){
		let h=M0.length/w;
	    let M=Array.from(M0);
	    for(let j=h-1;j>0;j--){
			for(let i=j+1;i<w;i++){
				M[j*w+i]/=M[j*w+j];
			}
			M[j*w+j]=1;
	        for(let k=0;k<j;k++){
	            for(let i=w-1;i>k;i--){
	                M[k*w+i]-=M[j*w+i]*M[k*w+j];
	            }
	            M[k*w+j]=0;
	        }
	    }
	    return M
	}//For almost all.
	//Line transfer
	addToLine(M,w,line1,line2,k){//Line1 is added to line2
		for(let i=0;i<w;i++){
			M[line2*w+i]+=k*M[line1*w+i];
		}
	}
	LineMultiply(M,w,line,k){
		for(let i=0;i<w;i++){
			M[line*w+i]*=k;
		}
	}
	swap(M,w,line1,line2){
	    let a;
	    for(let i=0;i<w;i++){
	        a=M[line1*w+i];
	        M[line1*w+i]=M[line2*w+i];
	        M[line2*w+i]=a;
	    }
	}
	printM(M,w){
		let h=M0.length/w;
	    let P=[];
	    let p=[];
	    for(let j=0;j<h;j++){
	        p=[];
	        for(let i=0;i<w;i++){
	            p.push(M[i+j*w]);
	        }
	        P.push(p);
            console.log(p)
	    }
	    return P;
	}
	getChild(M,w,x,y){
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
	getChild4det(M,w,x){
	    let h=M.length/w;
	    let a=[];
	    let b;
	    for(let j=1;j<h;j++){
	        b=j*w;
	        a=a.concat(M.slice(b,b+x)).concat(M.slice(b+x+1,b+w))
	    }
	    return a;
	}
	det(M,w){
	    if(w==1) return M[0];
	    let result=0
	    let s=1;
	    for(let i=0;i<w;i++){
	        result+=s*M[i]*this.det(this.getChild4det(M,w,i),w-1)
	        s=-s;
	    }
	    return result;
	}
	inverse(sequence){
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
	multiply(M1,w1,M2,w2){
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
	ranks1(M,w){
		let h=M.length/w;
		let times=Math.min(w,h);
		let j;
		for(j=0;j<times;j++){
			if(M[j*w+j]==0){
				return j;
			}
		}
		return j;
	}
	rank(M0,w){
		let M=this.s1(M0,w);
		return this.ranks1(M,w);
	}
    Schmidt(Vs){
        let squares=[]
        let products=[]
        for(let i=1;i<Vs.length;i++){
            squares[i]+=squareV(Vs[i])
            for(let k=0;k<i;j++){
            }
        }
    }
    innerProduct(v1,v2){
        if(v1.length!=v2.length){
            console.error('The length of the 2 vectors does not much to do inner product.')
        }
        let result=0
        for(let i=0;i<v1.length;i++){
            result+=v1[i]*v2[i];
        }
        return result;
    }
    squareV(v){
        let result=0
        for(let i=0;i<v.length;i++){
            result+=v[i]*v[i]
        }
        return result
    }
    norm(v){
        let result=0
        for(let i=0;i<v.length;i++){
            result+=v[i]*v[i]
        }
        return Math.sqrt(result);
    }
    inverse(M0,w){
        let h=M0.length/w;
        if(h!=w){
            console.error("The matrix to be inversed must be square.")
            return;
        }
        if(this.det(M0,w)==0){
            console.error("The determinant of the matrix to be inversed cannot be 0.");
            return;
        }
	    let M=Array.from(M0);
        let result=new Array(M0.length);
        for(let j=0;j<h;j++){//Initiating the left part.
            for(let i=0;i<w;i++){
                if(i==j){
                    result[j*w+i]=1;
                }
                else{
                    result[j*w+i]=0;
                }
            }
        }
	    for(let j=0;j<h;j++){
	        let k=j;
	        while(k<h && M[k*w+j]==0){
	            k++;
	        }
            if(k!=j){
                this.swap(M,w,k,j);
                this.swap(result,w,k,j);
            }
	        for(let i=w-1;i>j;i--){
	            M[j*w+i]/=M[j*w+j];
	        }
            for(let i=0;i<w;i++){
	            result[j*w+i]/=M[j*w+j];
            }
	        M[j*w+j]=1;
	        for(let k=j+1;k<h;k++){
                for(let l=0;l<w;l++){
                    result[k*w+l]-=result[j*w+l]*M[k*w+j]
                }
	            for(let l=w-1;l>j;l--){
	                M[k*w+l]-=M[j*w+l]*M[k*w+j];
	            }
                M[k*w+j]=0;
	        }
	    }
	    for(let j=h-1;j>0;j--){
	        for(let k=0;k<j;k++){
                for(let i=0;i<w;i++){
                    result[k*w+i]-=result[j*w+i]*M[k*w+j]
                }
	        }
	    }
        return result;
    }
    transpose(M,w){
        let h=M.length/w;
        if(h%1){
            console.error('The length of the array is not divisible by the input width!')
            return
        }
        let result=new Array(M.length);
        for(let j=0;j<h;j++){
            for(let i=0;i<w;i++){
                result[i*h+j]=M[j*w+i];
            }
        }
        return result;
    }
	//geometry
	getNormal(M,w,k=1){
		let h=M.length/w;
		for(let j=1;j<h;j++){
			for(let i=0;i<w;i++){
				M[j*w+i]-=M[i];
			}
		}
		M[0]=1;
		for(let i=1;i<w;i++){
			M[i]=0;
		}
	}
}
