import Env from '@ioc:Adonis/Core/Env'

export default [
  {
    network: 'mainnet',
    address: '',
  },
  {
    network: 'goerli',
    address: Env.get('GOERLI_MARASCAN_PROXY_CONTRACT_ADDRESS'),
  },
  {
    network: 'polygon',
    address: '',
  },
  {
    network: 'bsc',
    address: '',
  },
] as { network: string; address: string }[]
