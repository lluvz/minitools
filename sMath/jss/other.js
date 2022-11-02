class OtherMath{
    factorial(n){
        let result=1;
        for(let i=1;i<=n;i++){
            result*=i;
        }
        return result;
    }
    sumFactorial(n){
        let result=0;
        let f=1;
        for(let i=1;i<=n;i++){
            f*=i;
            result+=f;
        }
        return result;
    }
}
let O=new OtherMath();
console.log(Math.log(O.sumFactorial(50))/Math.log(10))
