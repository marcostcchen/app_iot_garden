import { Heading } from 'native-base'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { LineChartCustom } from '../../components'
import { Medicao } from '../../models'
import moment from 'moment';

interface Props {
  medicoes: Array<Medicao>
}

export const Historico: React.FC<Props> = (props: Props) => {
  const { medicoes } = props;
  const [labels, setLabels] = useState<Array<string>>([])
  const [temps, setTemps] = useState<Array<number>>([1])
  const [ares, setAres] = useState<Array<number>>([1])
  const [solos, setSolos] = useState<Array<number>>([1])
  const [lums, setLums] = useState<Array<number>>([1])

  useEffect(() => {
    handleSetLabels();
    handleSetTemps()
    handleSetSolos()
    handleSetAres()
    handleSetLums()
  }, [medicoes])

  const handleSetLabels = () => {
    const labels = medicoes.map((medicao) => {
      let date = new Date(medicao.created_at);
      return moment.utc(date).format('DD/MM-HH:mm')
    })
    setLabels(labels);
  }

  const handleSetTemps = () => {
    const temps = medicoes.map((medicao) => Number(medicao.temperatura))
    setTemps(temps)
  }

  const handleSetSolos = () => {
    const solos = medicoes.map((medicao) => Number(medicao.umidade_solo))
    setSolos(solos)
  }

  const handleSetAres = () => {
    const ares = medicoes.map((medicao) => Number(medicao.umidade_ar))
    setAres(ares)
  }

  const handleSetLums = () => {
    const lums = medicoes.map((medicao) => Number(medicao.temperatura))
    setLums(lums)
  }

  return (
    <View>
      <Heading size="md" style={{ color: 'green' }}>Histórico</Heading>

      <LineChartCustom
        labels={labels}
        dataSets={[{ data: temps }]}
        gradientFrom="#006f00bb"
        gradientTo="#bbff00eb"
        legend="Temperatura"
      />

      <LineChartCustom
        labels={labels}
        dataSets={[{ data: ares }]}
        gradientFrom="#000be2"
        gradientTo="#0054fb"
        legend="Umidade do Ar"
      />

      <LineChartCustom
        labels={labels}
        dataSets={[{ data: solos }]}
        gradientFrom="#784604"
        gradientTo="#9f8201"
        legend="Umidade do Solo"
      />

      <LineChartCustom
        labels={labels}
        dataSets={[{ data: lums }]}
        gradientFrom="#fbd500"
        gradientTo="#ff5126"
        legend="Luminosidade"
      />

    </View>
  )
}

