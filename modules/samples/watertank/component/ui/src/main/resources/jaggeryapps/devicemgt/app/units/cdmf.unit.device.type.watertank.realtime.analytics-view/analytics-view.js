/*
 * Copyright (c) 2016, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

function onRequest(context) {
    var device = context.unit.params.device;
    var devicemgtProps = require('/app/conf/devicemgt-props.js').config();
    var constants = require("/app/modules/constants.js");
    var websocketEndpoint = devicemgtProps["httpsURL"].replace("https", "wss");
    var tokenPair = session.get(constants.ACCESS_TOKEN_PAIR_IDENTIFIER);
    var token = "";
    if (tokenPair) {
        token = tokenPair.accessToken;
    }
    websocketEndpoint = websocketEndpoint + "/secured-outputui/org.wso2.iot.watertank/1.0.0?" +
                        "token=" + token + "&deviceId=" + device.deviceIdentifier + "&deviceType=" + device.type;
    return {"device": device, "websocketEndpoint": websocketEndpoint};
}