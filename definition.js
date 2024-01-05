const AS608ColorBlock = "#ffa64d";

var digitalPins = [
  [
    "D3",
    "D3"
  ],
  [
    "D4",
    "D4"
  ],
  [
    "D5",
    "D5"
  ],
  [
    "D6",
    "D6"
  ],
  [
    "D7",
    "D7"
  ],
  [
    "D8",
    "D8"
  ],
  [
    "D9",
    "D9"
  ],
  [
    "D10",
    "D10"
  ],
  [
    "D11",
    "D11"
  ],
  [
    "D12",
    "D12"
  ],
  [
    "D13",
    "D13"
  ],
  [
    "D0",
    "D0"
  ],
  [
    "D1",
    "D1"
  ],
  [
    "D2",
    "D2"
  ]
];

Blockly.Blocks['uno_fingerprint_init'] = {
  init: function () {
    this.jsonInit(
      {
        type: "uno_fingerprint_init",
        message0: "khởi tạo cảm biến vân tay chân TX %1 chân RX %2",
        previousStatement: null,
        nextStatement: null,
        args0: [
          {
            type: "field_dropdown",
            name: "TX",
            options: digitalPins
          },
          {
            type: "field_dropdown",
            name: "RX",
            options: digitalPins
          }
        ],
        colour: AS608ColorBlock,
        tooltip: "",
        helpUrl: ""
      }
    );
  }
};

Blockly.Blocks['uno_fingerprint_create'] = {
  init: function () {
    this.jsonInit({
      "type": "uno_fingerprint_create",
      "message0": "tạo dấu vân tay tại ID %1",
      "args0": [
        {
          "type": "input_value",
          "name": "ID"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": AS608ColorBlock,
      "tooltip": "Tạo dấu vân tay mới với ID từ 1-127",
      "helpUrl": "",
    });
  }
};

Blockly.Blocks['uno_fingerprint_result'] = {
  init: function () {
    this.jsonInit({
      "type": "uno_fingerprint_result",
      "message0": "kiểm tra kết quả lấy vân tay",
      "output": null,
      "colour": AS608ColorBlock,
      "tooltip": "Kiểm tra xem đã lấy dấu vân tay thành công hay chưa",
      "helpUrl": "",
    });
  }
};


Blockly.Blocks['uno_fingerprint_verify'] = {
  init: function () {
    this.jsonInit({
      "type": "uno_fingerprint_verify",
      "message0": "đọc cảm biến vân tay",
      "output": null,
      "colour": AS608ColorBlock,
      "tooltip": "Kiểm tra xem dấu vân tay có trùng khớp với những dấu vân tay đã lưu hay không",
      "helpUrl": "",
    });
  }
};

Blockly.Blocks['uno_fingerprint_check'] = {
  init: function () {
    this.jsonInit({
      "type": "uno_fingerprint_check",
      "message0": "kiểm tra xem dấu vân tay có trùng khớp với ID %1",
      "args0": [
        {
          "type": "input_value",
          "name": "ID"
        }
      ],
      "output": null,
      "colour": AS608ColorBlock,
      "tooltip": "Kiểm tra dấu vân tay đang được chạm có trùng khớp với ID đã lưu hay không",
      "helpUrl": ""
    });
  }
};

Blockly.Blocks['uno_fingerprint_delete'] = {
  init: function () {
    this.jsonInit({
      "type": "uno_fingerprint_delete",
      "message0": "xóa dấu vân tay tại ID %1",
      "args0": [
        {
          "type": "input_value",
          "name": "ID"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": AS608ColorBlock,
      "tooltip": "Xóa dấu vân tay đã lưu ở ID được chọn",
      "helpUrl": "",
    });
  }
};

Blockly.Blocks['uno_fingerprint_clear'] = {
  init: function () {
    this.jsonInit({
      "type": "uno_fingerprint_clear",
      "message0": "xóa toàn bộ dấu vân tay",
      "previousStatement": null,
      "nextStatement": null,
      "colour": AS608ColorBlock,
      "tooltip": "Xóa toàn bộ dấu vân tay đã được lưu",
      "helpUrl": ""
    });
  }
};

// Any imports need to be reserved words
Blockly.Python.addReservedWords('fingerprint');

Blockly.Python['uno_fingerprint_init'] = function (block) {
  // TODO: Assemble Python into code variable.
  var tx = block.getFieldValue('TX');
  var rx = block.getFieldValue('RX');
  Blockly.Python.definitions_['import_fingerprint'] = 'from fingerprint import *';
  // Blockly.Python.definitions_['init_fingerprint'] = 'fig = FINGER_PRINT(tx=' + tx + '_PIN, rx=' + rx + '_PIN)';
  var code = '';
  return code;
};

Blockly.Python['uno_fingerprint_create'] = function (block) {
  Blockly.Python.definitions_['import_fingerprint'] = 'from fingerprint import *';
  var value_id = Blockly.Python.valueToCode(block, 'ID', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'getFingerprintEnroll(' + value_id + ')\n';
  return code;
};

Blockly.Python['uno_fingerprint_result'] = function (block) {
  // TODO: Assemble Python into code variable.
  var code = 'getLastSaveResult()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['uno_fingerprint_verify'] = function (block) {
  // TODO: Assemble Python into code variable.
  var code = 'checkFinger()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['uno_fingerprint_check'] = function (block) {
  var value_id = Blockly.Python.valueToCode(block, 'ID', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'checkID(' + value_id + ')';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['uno_fingerprint_delete'] = function (block) {
  Blockly.Python.definitions_['import_fingerprint'] = 'from fingerprint import *';
  var value_id = Blockly.Python.valueToCode(block, 'ID', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'fig.deleteModel(' + value_id + ')\n';
  return code;
};

Blockly.Python['uno_fingerprint_clear'] = function (block) {
  // TODO: Assemble Python into code variable.
  var code = 'fig.emptyDatabase()\n';
  // TODO: Change ORDER_NONE to the correct strength.
  return code;
};