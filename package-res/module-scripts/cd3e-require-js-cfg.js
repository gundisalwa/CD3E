/*
 * Copyright 2002 - 2014 Webdetails, a Pentaho company.  All rights reserved.
 *
 * This software was developed by Webdetails and is provided under the terms
 * of the Mozilla Public License, Version 2.0, or any later version. You may not use
 * this file except in compliance with the license. If you need a copy of the license,
 * please go to  http://mozilla.org/MPL/2.0/. The Initial Developer is Webdetails.
 *
 * Software distributed under the Mozilla Public License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or  implied. Please refer to
 * the license for the specific language governing your rights and limitations.
 */

requireCfg['paths']['cd3e'] = CONTEXT_PATH + 'content/cd3e/cd3e/src/app';

requireCfg['paths']['angular-translate'] = CONTEXT_PATH + 'content/cd3e/cd3e/lib/angular-translate/angular-translate';
requireCfg['shim']['angular-translate'] = ['common-ui/angular'];

requireCfg['paths']['Base'] = CONTEXT_PATH + 'content/cd3e/cd3e/lib/base/Base';
requireCfg['shim']['Base'] = { exports: 'Base' };

requireCfg['paths']['angular-dragdrop'] = CONTEXT_PATH + 'content/cd3e/cd3e/lib/angular-dragdrop/angular-dragdrop';
requireCfg['shim']['angular-dragdrop'] = ['common-ui/angular', 'jquery-ui'];

requireCfg['paths']['angular-ui-bootstrap'] = CONTEXT_PATH + 'content/cd3e/cd3e/lib/angular-ui/ui-bootstrap-tpls-0.12.0.min';
requireCfg['shim']['angular-ui-bootstrap'] = ['common-ui/angular'];

requireCfg['paths']['jquery-ui'] = CONTEXT_PATH + 'content/cd3e/cd3e/lib/jquery-ui/jquery-ui';
requireCfg['shim']['jquery-ui'] = ['common-ui/jquery'];
