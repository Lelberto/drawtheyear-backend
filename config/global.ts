/** Global configuration */

export type NodeEnv = 'development' | 'test' | 'production';

export type GlobalConfig = {
  env: NodeEnv;
};

export default (): GlobalConfig => ({
  env: process.env.NODE_ENV as NodeEnv
});
