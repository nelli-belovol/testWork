// a)Заполнить массив заданной длины различными простыми числами. Натуральное число, большее единицы, называется простым, если оно делится только на себя и на единицу.
// function primeArray(arrayLeng){...};

function primeArray(arrayLeng) {
  let arr = []
  for (let i = 2; arr.length < arrayLeng; i++) {
    let flag = 1
    for (let j = 2; j <= i / 2 && flag == 1; j++) {
      if (i % j === 0) {
        flag = 0
        break
      }
    }
    if (flag === 1) {
      arr.push(i)
    }
  }
  return console.log('Результат задания a:', arr)
}

primeArray(5) // [2,3,5,7,11];
primeArray(7) // [2,3,5,7,11,13,17];

// b)Найти в строке все числа. Учитывать дробные числа.

// Например текст: У Пети было 10 яблок, 2.5 он отдал Маше, 3.5 Васе и 4 оставил себе.
// Результат
// //[10,2.5,3.5,4]

function findNum(string) {
  let arr = string.split(' ')
  let numbers = []
  arr.forEach(item => {
    //ПОСМОТРЕТЬ ЧЕРЕЗ ФИЛЬТР
    const num = Number(item)
    if (!isNaN(num)) {
      numbers.push(num)
    }
  })
  return console.log('Результат задания b:', numbers)
}

findNum('У Пети было 10 яблок, 2.5 он отдал Маше, 3.5 Васе и 4 оставил себе.')

// с). Замена подряд идущих букв на их количество.
// assdssddffffrrreeeweggggg // => 'as2ds2d2f4r3e3weg5' as2ds2d2f4r3e3weg5

function getDouble(string) {
  let arr = string.split('')

  let rezult = []
  let repeat = 1

  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i] !== arr[i + 1]) {
      if (repeat === 1) {
        rezult.push(arr[i])
      } else {
        rezult.push(arr[i])
        rezult.push(repeat)
        repeat = 1
      }
    } else {
      repeat += 1
      continue
    }
  }

  return console.log('Результат задания c:', rezult.join(''))
}
getDouble('assdssddffffrrreeeweggggg')

// d) Реализовать функцию get. Которая по пути ищет значение в объекте или в массиве.
const exampleArr = [{ a: { b: [{ c: 4 }, { c: 5 }] } }, { a: { b: [{ c: 6 }, { c: 7 }] } }]
const exampleObj = { a: { b: { c: 5 } } }

function get(data, path) {
  let arr = path.split('.')
  arr.forEach(el => (data = data[el]))
  console.log('Результат задания d:', data)
  return data
}

get(exampleArr, '0.a.b.1.c') // 5
get(exampleObj, 'a.b') // {c:5}

// e)Создать функцию которая при каждом вызове вернет случайное число от 0 до 100 без повторений. Если закончились варианты вернет ошибку. Реализовать через замыкание.
function getValue() {
  const arr = []

  return function getRandom() {
    const randomValue = Math.ceil(Math.random() * 100)

    if (arr.includes(randomValue)) {
      return `Число ${randomValue} уже было`
    } else {
      arr.push(randomValue)
      return randomValue
    }
  }
}

const rezult = getValue()
console.log('Результат задания e:', rezult())

// f) Реализовать класс очереди запросов. Методы queue, deQueue, queuing обязательно реализовать.
// Задано количество одновременно выполняемых запросов.
// В качестве запросов использовать Promise которые резолвятся через случайное время.
// Пример ниже можно доработать как Вы решите.

const randomIntegerFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

class ConcurencyQueue {
  constructor(concurency) {
    this.concurency = concurency
    this.currQuaReq = 0
  }

  //встать в очередь
  queue(requestId) {
    const delay = randomIntegerFromInterval(1000, 3000)

    console.log(`Транзакция ${requestId} встала в очередь`)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.currQuaReq += 1
        if (this.currQuaReq < 3) {
          resolve(requestId)
        }
        reject(requestId)
      })
    }, delay)
  }

  //удалить из очереди после выполнения
  deQueue(requestId) {
    console.log(`Транзакция ${requestId} удалена из очереди после выполнения`)
    return
  }

  //Обработка очереди
  queuing(requestId) {
    console.log(`Транзакция ${requestId} обработана`)
    return
  }
}

// const promise = new Promise(resolve => {
//   setTimeout(() => resolve(`Создан промис `), Math.ceil(Math.random() * (5000 - 1000) + 1000))
// })

const concQueue = new ConcurencyQueue(3)
const ReqId1 = concQueue.queue({ id: 1 })
const ReqId2 = concQueue.queue({ id: 2 })
const ReqId3 = concQueue.queue({ id: 3 })
const ReqId4 = concQueue.queue({ id: 4 })

concQueue.queuing(ReqId1, ReqId2, ReqId3, ReqId4)
