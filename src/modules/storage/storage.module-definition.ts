import { ConfigurableModuleBuilder } from '@nestjs/common';

type StorageModuleOptions = {
  type: 'local' | 's3';
}

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE
} = new ConfigurableModuleBuilder<StorageModuleOptions>()
  .setExtras({ isGlobal: false }, (definition, extras) => ({ ...definition, global: extras.isGlobal }))
  .build();
