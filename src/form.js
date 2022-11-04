import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  IconButton,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react'
import { useState } from 'react'
import { ArrowRightIcon, ArrowLeftIcon } from '@chakra-ui/icons'
import './App.css'

const Form = props => {
  const [isClicked, setIsClicked] = useState(false)
  const [step, setstep] = useState(0)
  const [alpha, setAlpha] = useState('')
  const [variable, setVariable] = useState('')
  const [arrayVariable, setarrayVariable] = useState([])

  const [conditionTotal, setconditionTotal] = useState('')
  const [arrayCondition, setarrayCondition] = useState([])
  const [dataRow, setDataRow] = useState([])
  const [weightResult, setWeightResult] = useState({
    variable: '',
    result: ''
  })

  console.log({
    weightResult,
    step,
    dataRow,
    alpha,
    variable,
    arrayVariable,
    conditionTotal,
    arrayCondition
  });

  const findResult = (variable) => {
    const filtered = dataRow.filter(res => res.column === variable)
    const max = Math.max(...filtered.map(obj => Number(obj.value)));
    const maxValue = filtered.filter(obj => Number(obj.value) === max)[0]['value'];

    const min = Math.min(...filtered.map(obj => Number(obj.value)))
    const minValue = filtered.filter(obj => Number(obj.value) === min)[0]['value'];

    {/* α*nilai_max​+(1−α)*nilai_min​ */}
    const value = (Number(alpha)*Number(maxValue)) + ((1-Number(alpha))*Number(minValue))
    localStorage.setItem(variable, value)
    return value
  }

  const findConclusion = (type) => {
    const tempArr = arrayVariable.map(res => ({ variable: res, value: localStorage.getItem(res) }))
    const maxValue = tempArr.sort((a, b) => b.value - a.value)[0]

    return type === 'variable' ? maxValue.variable : maxValue.value
  }

  const AlphaForm = () => (
    <FormControl>
      <FormLabel>Masukkan alpha (&prop;)</FormLabel>
      <NumberInput min={0} max={1} onChange={(e) => {
        setIsClicked(false)
        setAlpha(e)
      }} value={alpha}>
        <NumberInputField />
      </NumberInput>
      <FormHelperText>(&prop;) Minimal 0 & Maksimal 1</FormHelperText>
    </FormControl>
  )

  const DecisionForm = () => (
    <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
      <FormControl>
        <FormLabel>Jumlah Alternatif Keputusan</FormLabel>
        <NumberInput min={2} max={4} onChange={(e) => {
          setIsClicked(false)
          setVariable(e)
          setarrayVariable(Array(Number(e)).fill(''))
        }} value={variable}>
          <NumberInputField />
        </NumberInput>
        <FormHelperText>Minimal 2 & Maksimal 4</FormHelperText>
      </FormControl>
      {isClicked && !!variable && Array(Number(variable)).fill('').map((res, i) =>
        <FormControl key={i}>
          <FormLabel>{`Nama Alternatif Keputusan ${i+1}`}</FormLabel>
          <Input type='text' name={i} onChange={(e) => {
            let newArr = [...arrayVariable]
            newArr[i] = e.target.value

            setarrayVariable(newArr)
          }} value={arrayVariable[i]} placeholder='Rumah / Apart' />
        </FormControl>
      )}
    </div>
  )

  const ConditionForm = () => (
    <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
      <FormControl>
        <FormLabel>Jumlah Kondisi</FormLabel>
        <NumberInput min={2} max={4} onChange={(e) => {
          setIsClicked(false)
          setconditionTotal(e)
          setarrayCondition(Array(Number(e)).fill(''))
        }} value={conditionTotal}>
          <NumberInputField />
        </NumberInput>
        <FormHelperText>Minimal 2 & Maksimal 4</FormHelperText>
      </FormControl>
      {isClicked && !!conditionTotal && Array(Number(conditionTotal)).fill('').map((res, i) =>
        <FormControl key={i}>
          <FormLabel>{`Nama Kondisi ${i+1}`}</FormLabel>
          <Input type='text' name={i} onChange={(e) => {
            let newArr = [...arrayCondition]
            newArr[i] = e.target.value

            setarrayCondition(newArr)
          }} value={arrayCondition[i]} placeholder='Baik / Buruk' />
        </FormControl>
      )}
    </div>
  )

  const InputDataForm = () => (
    <div>
      <h3 style={{ textAlign: 'center' }}>Input data row</h3>
      <div style={{ display: 'flex', gap: '16px', flexDirection: 'column', marginTop: 20 }}>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ width: 200, border: '1px solid white', padding: 8 }}></div>
          {arrayCondition.map((res, i) =>
            <h3 style={{ width: 200, border: '1px solid white', padding: 8, textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', wordBreak: 'break-all' }} key={i}>{res}</h3>
          )}
        </div>
        {arrayVariable.map((column, i) =>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'space-between', width: '100%' }} key={i}>
            <h3 style={{ width: 200, border: '1px solid white', padding: 8, display: 'flex', alignItems: 'center', wordBreak: 'break-all' }} key={i}>{column}</h3>
            {arrayCondition.map((row, i) =>
              <div style={{ width: 200, border: '1px solid white', padding: 8 }} key={i}>
                <Input
                  type='text'
                  name={i}
                  style={{ borderColor: '#6599FF' }}
                  onChange={(e) => {
                    const { value } = e.target

                    let newArr = [...dataRow]
                    const indexData = newArr.findIndex(res => res.row === row && res.column === column)

                    if (indexData > -1) {
                      newArr[indexData].value = value

                      setDataRow(newArr)
                    } else {
                      const data = {
                        row,
                        column,
                        value
                      }

                      newArr.push(data)
                      setDataRow(newArr)
                    }
                  }}
                  value={dataRow.find(res => res.row === row && res.column === column)?.value}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )

  const ResultPage = () => (
    <div>
      <h3 style={{ textAlign: 'center' }}>Input data row</h3>
      <h4 style={{ textAlign: 'left', marginTop: 20 }}>Berat Rata2: Hi ​= α*nilai_max​+(1−α)*nilai_min​</h4>
      <div style={{ display: 'flex', gap: '16px', flexDirection: 'column', marginTop: 10 }}>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ width: 200, border: '1px solid white', padding: 8 }}></div>
          {arrayCondition.map((res, i) =>
            <h3 style={{ width: 200, border: '1px solid white', padding: 8, textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', wordBreak: 'break-all' }} key={i}>{res}</h3>
          )}
          <div style={{ width: 200, border: '1px solid white', padding: 8 }}>Berat Rata2</div>
        </div>
        {arrayVariable.map((column, i) =>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'space-between', width: '100%' }} key={i}>
            <h3 style={{ width: 200, border: '1px solid white', padding: 8, display: 'flex', alignItems: 'center', wordBreak: 'break-all' }} key={i}>{column}</h3>
            {arrayCondition.map((row, i) =>
              <div style={{ width: 200, border: '1px solid white', padding: 8 }} key={i}>
                <h3>{dataRow.find(res => res.row === row && res.column === column).value}</h3>
              </div>
            )}

            <div style={{ width: 200, border: '1px solid white', padding: 8 }}>{findResult(column)}</div>
          </div>
        )}
      </div>
      <h3 style={{ marginTop: 20 }}>Kesimpulan maka berdasarkan metode hurwicz keputusan yang diambil adalah <b>{findConclusion('variable')}</b> dengan nilai <b>{findConclusion()}</b></h3>
    </div>
  )

  const controlForm = (step) => {
    switch (step) {
      case 0:
        return AlphaForm();

      case 1:
        return DecisionForm();

      case 2:
        return ConditionForm();

      case 3:
        return InputDataForm();

      case 4:
        return ResultPage();

      default:
        break;
    }
  }

  return (
    <div className='form'>
      {controlForm(step)}

      <div style={{ marginTop: '20px' }}>
        <IconButton onClick={() => {
          setIsClicked(true)
          setstep(step-1)
          arrayVariable.forEach(res => ({ variable: res, value: localStorage.removeItem(res) }))
        }} style={{float: 'left', visibility: !step ? 'hidden' : 'visible'}} aria-label='Search database' icon={<ArrowLeftIcon />} />
        <IconButton onClick={() => {
          if (step === 0 && !alpha) return
          if (step === 1 && arrayVariable.includes('')) return setIsClicked(true)
          if (step === 2 && arrayCondition.includes('')) return setIsClicked(true)
          if (step === 3 && dataRow.length !== (arrayVariable.length * arrayCondition.length)) return

          setIsClicked(true)
          setstep(step+1)
        }} style={{float: 'right', visibility: step === 4 ? 'hidden' : 'visible'}} aria-label='Search database' icon={<ArrowRightIcon />} />
      </div>

    </div>
  )
}

export default Form