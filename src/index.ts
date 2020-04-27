import * as math from 'mathjs'
import csvToMatrix from 'csv-to-array-matrix'

csvToMatrix('./src/data.csv', init)

function init(matrix: any) {
  // Part 0: Preparation
  console.log('Part 0: Preparation ...\n')

  let X = math.evaluate('matrix[:, 1:2]', {
    matrix
  })
  let y = math.evaluate('matrix[:, 3]', {
    matrix
  })

  let m = y.length

  // Part 1: Normal Equation
  console.log('Part 1: Normal Equation ...\n')

  // Add Intercept Term
  X = math.concat(math.ones([m, 1]).valueOf() as any, X)

  let theta = normalEquation(X, y)

  console.log('theta: ', theta)
  console.log('\n')

  // Part 2: Predict Price of 1650 square meter and 3 bedroom house
  console.log('Part 2: Price Prediction ...\n')

  let houseVector = [1, 1650, 3]
  let price = math.evaluate('houseVector * theta', {
    houseVector,
    theta
  })

  console.log('Predicted price for a 1650 square meter and 3 bedroom house: ', price)
}

function normalEquation(X: number[], y: number) {
  let theta = math.evaluate(`inv(X' * X) * X' * y`, {
    X,
    y
  })

  return theta
}
