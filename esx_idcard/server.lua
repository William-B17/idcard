local ESX = nil
TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
RegisterServerEvent('jsfour-idcard:open')
AddEventHandler('jsfour-idcard:open', function(ID, targetID, type)
	local identifier = ESX.GetPlayerFromId(ID).identifier
	local _source 	 = ESX.GetPlayerFromId(targetID).source
	local show       = false
	MySQL.Async.fetchAll('SELECT firstname, lastname, dateofbirth, sex, height, identifier FROM users WHERE identifier = @identifier', {['@identifier'] = identifier},
	function (user)
		if (user[1] ~= nil) then
			MySQL.Async.fetchAll('SELECT type FROM user_licenses WHERE owner = @identifier', {['@identifier'] = identifier},
			function (licenses)
				if type ~= nil then
					for i=1, #licenses, 1 do
						if type == 'driver' then
							if licenses[i].type == 'drive' or licenses[i].type == 'drive_bike' or licenses[i].type == 'drive_truck' then
								show = true
							end
						elseif type =='weapon' then
							if licenses[i].type == 'weapon' then
								show = true
							end
						elseif type =='bigweapon' then
							if licenses[i].type == 'bigweapon' then
								show = true
							end
						end
					end
				else
					show = true
				end
				MySQL.Async.fetchAll('SELECT name FROM owned_properties WHERE owner = @identifier', {['@identifier'] = identifier},
				function (name)
					if (name[1] == nil) then
						if show then
							local array = {
								user = user,
								licenses = licenses,
								id = ID,
								prop = 0
							}
							TriggerClientEvent('jsfour-idcard:open', _source, array, type)
						else
							TriggerClientEvent('esx:showNotification', _source, "Du har ikke den type licens..")
						end
					else 
						if show then
							local array = {
								user = user,
								licenses = licenses,
								id = ID,
								prop = 1,
								name = name
							}
							TriggerClientEvent('jsfour-idcard:open', _source, array, type)
						else
							TriggerClientEvent('esx:showNotification', _source, "Du har ikke den type licens..")
						end
					end
				end)
			end)
		end
	end)
end)
