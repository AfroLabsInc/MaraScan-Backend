import CamelCaseNamingStrategy from './CamelCaseNamingStrategy'
import { BaseModel } from '@ioc:Adonis/Lucid/Orm'

BaseModel.namingStrategy = new CamelCaseNamingStrategy()
