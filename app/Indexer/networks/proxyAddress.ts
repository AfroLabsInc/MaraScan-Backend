import Env from '@ioc:Adonis/Core/Env'

export const marascanAddresses = [
  {
    network: 'mainnet',
    address: '',
  },
  {
    network: 'goerli',
    address: Env.get('MARASCAN_PROXY_CONTRACT_ADDRESS'),
  },
  {
    network: 'polygon',
    address: Env.get('MARASCAN_PROXY_CONTRACT_ADDRESS'),
  },
  {
    network: 'bsc',
    address: '',
  },
] as { network: string; address: string }[]

export const marascanOperationAddresses = [
  {
    network: 'mainnet',
    address: '',
  },
  {
    network: 'goerli',
    address: Env.get('MARASCAN_OPERATION_PROXY_CONTRACT_ADDRESS'),
  },
  {
    network: 'polygon',
    address: Env.get('MARASCAN_OPERATION_PROXY_CONTRACT_ADDRESS'),
  },
  {
    network: 'bsc',
    address: '',
  },
] as { network: string; address: string }[]

export const usdcAddresses = [
  {
    network: 'mainnet',
    address: '',
  },
  {
    network: 'goerli',
    address: Env.get('USDC_CONTRACT_ADDRESS'),
  },
  {
    network: 'polygon',
    address: Env.get('USDC_CONTRACT_ADDRESS'),
  },
  {
    network: 'bsc',
    address: '',
  },
] as { network: string; address: string }[]
