/*
 * Copyright (c) 2022 dzikoysk
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true // Lack of support in ESLint rules tho
    }),
    WindiCSS()
  ],
  base:
    process.env.NODE_ENV === 'production'
      ? '{{REPOSILITE.VITE_BASE_PATH}}'
      : '/',
  build: {
    emptyOutDir: true,
    outDir: '../reposilite-backend/src/main/resources/reposilite-frontend'
  },
  define: {
    'process.env': {}, // hack so the json schema ref parser does not error
    'process.platform': {}, // hack so the json schema ref parser does not error
    'process.nextTick': {}, // hack so the json schema ref parser does not error
    'global.process': {} // hack so the json schema ref parser does not error
  }
})
