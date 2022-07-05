ENGLISH VERSION COMING SOON

시작
==

**utils.js 파일을 받아서 head 부분에 작성하시면 됩니다.**

Number, Boolean, String, Array 타입 지원  
Object 타입은 타 라이브러리에 오류가 있어 지원 불가능  
Prototype 형태로 제작되어 있으므로, 바로 사용 가능합니다.

```
<script type="text/javascript" src="utils.js">
let a = [10, 20, 30, 40];
document.write(a.sum()); // 100
let b = [20, 50, 0, 5];
document.write(a.add(b).toStringEx()); // [30, 70, 30, 45]
</script>
```

**Node.js 에서**

```
require('utils.js');
let a = [10, 20, 30, 40];
console.log(a.sum()); // 100
let b = [20, 50, 0, 5];
console.log(a.add(b).toStringEx()); // [30, 70, 30, 45]
```



데이터 타입
==

**기본형** : Number, Boolean, String, Array, (TypedArray 지원예정)  
**결측치** : NA


단항 연산
==

* 정수 리터럴은, `..` 으로 작성 (괄호 묶인 경우 등 제외)
* 그 외 : `.`으로 작성

|연산 |  설명|예제|
|---|---|---|
|NaNtoNA|NaN을 NA로 변환|NaN.NaNtoNA() = NA|
|NAtoNaN|NA를 NaN으로 변환|NA.NAtoNaN() = NaN|
|abs|절댓값|`(-20).abs() = 20`|
|acos|cos^-1|`0.5.acos().toDegrees().precise() = 60`|
|acosh|cosh^-1|`2..acosh() = 1.3169578969248166`|
|acot|cot^-1|`3..sqrt().acot().toDegrees().precise() = 30`|
|acsc|csc^-1|`2..acsc().toDegrees().precise() = 30`|
|asFraction|분수로 변환 (분모 1000000 이내)|`Math.PI.asFraction() = [3126535, 995207]`|
|asec|sec^-1|`2..asec().toDegrees().precise() = 60`|
|asin|sin^-1|`0.5.asin().toDegrees().precise() = 30`|
|asinh|sinh^-1|`2..asinh() = 1.4436354751788103`|
|atan|tan^-1|`3..sqrt().atan().toDegrees().precise() = 60`|
|atanh|tanh^-1|`0.5.atanh() = 0.5493061443340548`|
|bin|2진법 문자열 변환|`79..bin() = '1001111'`|
|binToNumber|2진법을 숫자로|`'1001111'.binToNumber() = 79`|
|bitwiseNot|비트 반전 연산|`100..bitwiseNot() = -101`|
|boolean|불리언 변환|`10..boolean() = true`|
|byteCut|바이트 단위 자름|`1234..byteCut() = -46`|
|cbrt|세제곱근|`(-8).cbrt() = -2`|
|ceil|천장함수|`Math.PI.ceil() = 4`|
|cos|코사인함수|`30..toRadians().cos() = 0.8660254037844387`|
|cosh|쌍곡코사인함수|`1..cosh() = 1.5430806348152437`|
|cot|코탄젠트함수|`30..toRadians().cot() = 1.7320508075688774`|
|count|개수(배열에서 사용, 호환용)|`12.3.count() = 1`|
|csc|코시컨트|`30..toRadians().csc().precise() = 2`|
|cube|세제곱|`2..cube() = 8`|
|decToNumber\*|십진법을 숫자로|`'12.3xy'.decToNumber() = 12.3`|
|divisors|약수|`12..divisors() = [1, 2, 3, 4, 6, 12]`|
|exp|e^x|`2..exp() = 7.38905609893065`|
|expm1|e^x-1|`0.001.expm1() = 0.0010005001667083417`|
|floor|바닥함수|`Math.E.floor() = 2`|
|hex|16진법 문자열 변환 (소문자)|`79..hex() = '4f'`|
|hexToNumber|16진법을 숫자로|`'C0FFEE'.hexToNumber() = 12648430`|
|intCut|32비트 단위 자름|`1234567891234..intCut() = 1912277282`|
|log|로그함수|`2..log() = 0.6931471805599453`|
|log10|상용로그함수|`2..log10() = 0.3010299956639812`|
|log1p|log (1+x)|`0.001.log1p() = 0.0009995003330835331`|
|minus|-x|`12.3.minus() = -12.3`|
|modf|정수/소수 분할|`12.25.modf() = [12, 0.25]`|
|not|논리 부정|`true.not() = false`|
|oct|8진법 문자열 변환|`79..oct() = 117`|
|octToNumber|8진법을 숫자로|`'117'.octToNumber() = 79`|
|pack1|해당 원소 길이가 1인 배열로 포장|`10..pack1() = [10]`|
|percent|퍼센트 변환 (x\*100)|`0.365.percent() = 36.5`|
|permil|퍼밀 변환 (x\*1000)|`0.365.permil() = 365`|
|plus\*|+x, 숫자로 변환|`'12.3'.plus() = 12.3`|
|pow10|10^x|`0.3.pow10() = 1.9952623149688795`|
|precise|소수점 오차 보정|`0.1.add(0.2).precise() = 0.3`|
|reciproc|역수|`0.1.reciproc() = 10`|
|round|반올림|`0.51.round() = 1`|
|sec|시컨트함수|`30..toRadians().sec() = 1.1547005383792515`|
|shortCut|16비트 단위 자름|`123456..shortCut() = -7616`|
|sign|부호함수|`12.3.sign() = 1`|
|sin|사인함수|`30..toRadians().sin().precise() = 0.5`|
|sinh|쌍곡사인함수|`1..sinh() = 1.1752011936438014`|
|sminus|문자열 음수, 뒤집기|`'ABCD'.sminus() = 'DCBA'`|
|splus|문자열 양수, 문자열 변환|`12.3.splus() = '12.3'`|
|sqrt|제곱근|`16..sqrt() = 4`|
|square|제곱|`16..square() = 256`|
|sreciproc|각 문자열 분할|`'ABCD'.sreciproc() = ["A", "B", "C", "D"]`|
|strLen|문자열 길이|`'abracadabra'.strLen() = 11`|
|tan|탄젠트함수|`45..toRadians().tan().precise() = 1`|
|tanh|쌍곡탄젠트함수|`1..tanh() = 0.7615941559557649`|
|this|현재 객체 반환 (항등 메소드)|`123..this() = 123`|
|toDegrees|라디안을 60분법으로|`Math.PI.toDegrees() = 180`|
|toLowerCase|소문자 변환 (모든타입 확장)|`NaN.toLowerCase() = 'nan'`|
|toRadians|60분법을 라디안으로|`60..toRadians() = 1.0471975511965976`|
|toUpperCase|대문자 변환 (모든타입 확장)|`true.toUpperCase() = 'TRUE'`|
|trunc|소수점 절삭|`(-12.7).trunc() = -12`|
|uhex|16진법 문자열 변환 (대문자)|`79..uhex() = '4F'`|
|unpercent|퍼센트 해제 (x/100)|`36.5.unpercent() = 0.365`|
|unpermil|퍼밀 해제 (x/1000)|`36.5.unpermil() = 0.0365`|
|validCount|유효 개수 (배열에서 사용, 호환용)|`NA.validCount() = 0`|

> *plus*
> `+x` 방식 사용, 유효하지 않은 문자가 뒤에 섞여 있으면 NaN  
> *decToNumber*
> `parseInt(x)` 방식 사용, 유효하지 않은 문자가 뒤에 섞여 있으면 무시하고 변환  
> *sign*
> 양수: 1, 음수: -1, 0: 0, NaN: NaN

이항 연산
==

* 정수 리터럴은, `..` 으로 작성 (괄호 묶인 경우 등 제외)
* 그 외 : `.`으로 작성


|연산 |  설명|예제|
|---|---|---|
|abSub|뺄셈 절댓값\|a-b\||`100..abSub(130) = 30`|
|add|덧셈|`10..add(20) = 30`|
|atan2|역탄젠트|`5..atan2(3) = 1.0303768265243125`|
|baseString|해당 진법 변환|`1234.5.baseString(36) = 'ya.i'`|
|bitwiseAnd|비트간 곱 연산 (&)|`12..bitwiseAnd(5) = 4`|
|bitwiseLsh|비트 왼쪽 쉬프트 연산 (<<)|`12..bitwiseLsh(5) = 384`|
|bitwiseOr|비트간 합 연산 (\|)|`12..bitwiseOr(5) = 13`|
|bitwiseRsh|비트 오른쪽 쉬프트 연산 (>>)|`(-20).bitwiseRsh(2) = -5`|
|bitwiseUrsh|비트 부호 없는 오른쪽 쉬프트 연산 (>>>)|`(-20).bitwiseUrsh(2) = 1073741819`|
|bitwiseXor|비트간 배타적 합 연산 (\^)|`12..bitwiseXor(5) = 9`|
|center|두 수의 가운데 값 (a+b)/2|`20..center(80) = 5`0|
|delta|증감률 (b-a)/a|`500..delta(600) = 0.2`|
|digitCeil|소수점 자리 천장함수|`Math.PI.digitCeil(4) = 3.1416`|
|digitFloor|소수점 자리 바닥함수|`Math.PI.digitCeil(4) = 3.1415`|
|digitRound|소수점 자리 반올림|`Math.PI.digitCeil(4) = 3.1416`|
|digitTrunc|소수점 자리 절삭|`Math.PI.digitCeil(4) = 3.1415`|
|div|나눗셈|`18..div(4) = 4.5`|
|divLim0|나눗셈, 0/0=0으로 계산|`0..divLim0(0) = 0`|
|divLim1|나눗셈, 0/0=1로 계산|`0..divLim1(0) = 1`|
|divLimInf|나눗셈, 0/0=Infinity로 계산|`0..divLimInf(0) = Infinity`|
|dm|몫과 나머지를 배열로|`18..dm(4) = \[4, 2\]`|
|factorCeil|배수 천장함수|`15.3.factorCeil(4) = 16`|
|factorFloor|배수 바닥함수|`15.3.factorFloor(4) = 12`|
|factorRound|배수 반올림|`15.3.factorRound(4) = 16`|
|factorTrunc|배수 절삭|`15.3.factorTrunc(4) = 12`|
|fractionCeil|분수 천장함수|`15.3.fractionCeil(4) = 15.5`|
|fractionFloor|분수 바닥함수|`15.3.fractionFloor(4) = 15.25`|
|fractionRound|분수 반올림|`15.3.fractionRound(4) = 15.25`|
|fractionTrunc|분수 절삭|`15.3.fractionTrunc(4) = 15.25`|
|gcd|최대공약수|`12..gcd(20) = 4`|
|gcenter|두 수의 기하평균|`20..gcenter(80) = 40`|
|greatest|큰 값 반환 max(a,b)|`20..greatest(80) = 80`|
|hAbSub|뺄셈 절댓값 절반 \|a-b\|/2|`100.hAbSub(130) = 15`|
|hcenter|두 수의 조화평균 √(ab)|`20..hcenter(80) = 32`|
|hypot|빝변의 길이 √(a²+b²)|`3..hypot(4) = 5`|
|idiv|나눗셈 몫|`18..idiv(4) = 4`|
|lcm|최소공배수|`12..lcm(20) = 60`|
|least|작은 값 반환 min(a,b)|`20..least(80) = 20`|
|logBase|밑이 주어진 로그|`625..logBase(5) = 4`|
|mod|나눈 나머지|`18..mod(4) = 2`|
|mul|곱셈|`20..mul(5) = 100`|
|naValue|N/A값 처리|`NA.naValue(20) = 20`|
|pack2|둘의 값을 묶음|`20..pack2(80) = \[20, 80\]`|
|padd\*|정밀 보정 덧셈|`0.7.padd(0.2) = 0.9`|
|pdiv\*|정밀 보정 나눗셈|`0.7.padd(0.2) = 3.5`|
|pmul\*|정밀 보정 곱셈|`0.7.padd(0.2) = 0.14`|
|pow|거듭제곱, powLim1과 같음|`3..pow(4) = 81`|
|powLim0|거듭제곱, 0^0=0으로 계산|`0..powLim0(0) = 0`|
|powLim1|거듭제곱, 0^0=1로 계산|`0..powLim1(0) = 1`|
|psub\*|정밀 보정 뺄셈|`0.7.psub(0.2) = 0.5`|
|root|N제곱근|`(-32).root(5) = -2`|
|sadd|문자열 덧셈, 결합|`'apple'.sadd('mango') = 'applemango'`|
|sdiv|문자열 나눗셈, 분할|`'apple/mango'.sdiv('/') = ['apple','mango']`|
|slsh|문자열 좌측 회전|`'rainbow'.slsh(1) = 'ainbowr'`|
|smod|문자열 절단|`'rainbow'.smod(3) = 'rai'`|
|smul|문자열 곱셈, 반복|`'*'.smul(5) = '*****'`|
|sqSub|뺄셈 제곱 (a-b)²|`100..sqSub(130) = 900`|
|srsh|문자열 우측 회전|`'rainbow'.srsh(1) = 'wrainbo'`|
|ssub|문자열 뺄셈, 삭제|`'abracadabra'.ssub('a') = 'brcdbr'`|
|sub|뺄셈|`70..sub(20) = 50`|
|toPolar|직교좌표를 극좌표로 (x.toPolar(y) = \[r, theta\])|`20..toPolar(-20) = [28.284271247461902, -0.7853981633974483]`|
|toXY|극좌표를 직교좌표로 (r.toXY(theta) = \[x, y\])|`20..toXY(Math.PI/6) = [17.320508075688775, 9.999999999999998]`|

> *padd, psub, pmul, pdiv*
> 0.1+0.2=0.30000000000000004 등 부동소수점 오차에 따른 값을 보정하여 계산, 계산 후 `.precise()` 실행  

비교 연산
==

|연산 |  설명|예제|
|---|---|---|
|compare\*   |수의 비교 sign(a-b)|`20..compare(21) = -1`|
|coprime     |서로소 판정 함수|`12..coprime(17) = true`|
|equal       |같음|`12..equal('12') = true`|
|geq         |크거나 같음|`12..geq(17) = false`|
|greater     |큼|`12..geq(17) = false`|
|identical   |같고 타입 일치|`12..identical('12') = false`|
|leq         |작거나 같음|`12..leq(17) = true`|
|less        |작음|`12..less(17) = true`|
|notEqual    |다름|`12..notEqual('12') = false`|
|notIdentical|타임 불일치 또는 다름|`12..notIdentical('12') = true`|
|notSimilar\*|비슷하지 않음|`'abc'.notSimilar('ABC') = false`|
|similar\*   |비슷함|`'abc'.similar('ABC') = true`|

> *compare*
> 현재 객체의 값이 다른 객체의 값보다 크면 1, 작으면 -1, 같으면 0, NaN이 존재할 시 NaN 반환, 문자열은 사전순 비교  

> *similar, notSimilar*
> 숫자(Number): 둘 다 `.precise()` 적용 후 같을 시 `true`
> 문자(String, ETC.): 대/소문자 무시 비교  





배열 내부 연산
==

```
document.write([10, 20, 30].add()); // 10 + 20 + 30 = 60
document.write([100, 20, 30].sub()); // 100 - 20 - 30 = 50
```

배열 간 연산
==

```
document.write([10, 20, 30].add([40, 50, 80])); // [10+40, 20+50, 30+80] = [50, 70, 110]
```

스칼라 연산
==

```
document.write([10, 20, 30].add(5)); // [10+5, 20+5, 30+5] = [15, 25, 35]
```

브로드캐스팅
==

```
document.write([1, 4, 3].add([2, [5, 3], 8])); // [1+2, 4+[5, 3], 3+8] = [3, [4+5, 4+3], 11] = [3, [9, 7], 11]
```




