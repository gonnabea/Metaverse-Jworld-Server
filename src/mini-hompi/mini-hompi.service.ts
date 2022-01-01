import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateMiniHompiInput, CreateMiniHompiOutput } from './dtos/createMiniHompi.dto';
import { GetAllMiniHompiOutput } from './dtos/getAllMiniHompis.dto';
import { MiniHompi } from './entities/miniHompi.entity';

@Injectable()
export class MiniHompiService {

    constructor(
        @InjectRepository(MiniHompi) private readonly miniHompiRepository: Repository<MiniHompi>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,

    ) {}

    async create({ scale }: CreateMiniHompiInput, owner): Promise<CreateMiniHompiOutput> {
        try {

            const user:User = await this.userRepository.findOne({id: owner.userId})

            if(!user) {
                return {
                    ok: false,
                    status: 400,
                    error: "로그인 된 유저를 찾을 수 없습니다."
                }
            }
            console.log(user)
            // const miniHompi = await this.miniHompiRepository.findOne({id: user.miniHompi?.id});
            // console.log(miniHompi)
            // // 기존에 저장된 미니홈피를 제거하여 초기화
            // if(miniHompi) {
            //     await this.miniHompiRepository.remove(miniHompi);
            // }
            
            const newMiniHompi = this.miniHompiRepository.create({
                scale
            })

            

            
            newMiniHompi.owner = user;
            
            await this.miniHompiRepository.save(newMiniHompi)

            user.miniHompi = newMiniHompi
           
            await this.userRepository.save(user);
          

            console.log(user)
            console.log(newMiniHompi)

            return {
                ok: true,
                status: 200
            }
            

        }
        catch(error) {
            return {
                ok: false,
                error,
                status: 400
            }
        }
        
    }

    async getAll():Promise<GetAllMiniHompiOutput> {
        try {
            const miniHompis = await this.miniHompiRepository.find();
            
            return {
                ok: true,
                status: 200,
                miniHompis
            }
        }
        catch(error) {
            return {
                ok: false,
                status: 400,
                error
            }
        }
    }

}
