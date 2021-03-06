# API Documentation

|Endpoint|Description|
|---|---|
|GET /vehicles/:id|Retrieve general vehicle information|
|GET /vehicles/:id/doors|Retrieve locked status of each door|
|GET /vehicles/:id/fuel|Retrieve fuel level as a percent|
|GET /vehicles/:id/battery|Retrieve battery level as a percent|
|POST /vehicles/:id/engine|Starts or Stops car engine|


## Retrieve general vehicle information

```
GET /vehicles/:id
```
### Example Response

```json
Status: 200 OK

{
  "vin": "123123412412",
  "color": "Metallic Silver",
  "doorCount": 4,
  "driveTrain": "v8"
}

```

## Retrieve locked status of each door

```
GET /vehicles/:id/doors
```
### Example Response

```json
Status: 200 OK

[
  {
      "location": "frontLeft",
      "locked": true
    },
    {
      "location": "frontRight",
      "locked": true
  } 
]

```

## Retrieve fuel level as a percent

```
GET /vehicles/:id/fuel
```
### Example Response

```json
Status: 200 OK

{
  "percent": 30
}

```

## Retrieve battery level as a percent

```
GET /vehicles/:id/battery
```
### Example Response

```json
Status: 200 OK

{
  "percent": 50
}

```

## Starts or Stops car engine

```
POST /vehicles/:id/engine
```

|Header|Value|
|---|---|
|Content-Type:|application/json|

```json
{
  "Content-Type": "application/json"
}
```

### Input

|Name|Type|Description|
|---|---|---|
|action|string|Action to broadcast to engine.|

```json
{
  "action": "START|STOP"
}
```

### Example Response

```json
Status: 201 Created

{
  "status": "success|error"
}
```
